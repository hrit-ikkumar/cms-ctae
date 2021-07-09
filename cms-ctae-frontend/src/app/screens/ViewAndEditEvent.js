import React, { useCallback, useState, useReducer, useEffect } from "react";
import DateTime from "react-datetime";
import { useHistory, useParams } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import FormInput, { InputContainer, LabelField } from "../components/FormInput";

import { selectEvents } from "../features/eventsSlice";
import { selectUser } from "../features/authSlice";
import { SubmitButton } from "./RegisterScreen";

import axios from "axios";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";
const SET_FORM = "SET_FORM";

const initialState = {
  values: {
    title: "",
    description: "",
    meetUrl: "",
    dateTime: "",
  },
  validities: {
    title: false,
    description: false,
    meetUrl: false,
    dateTime: false,
  },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case RESET_FORM:
      return initialState;

    case SET_FORM:
      return { ...state, ...action.payload };

    case UPDATE_FORM:
      const { id, value, isValid } = action.payload;
      const values = { ...state.values, [id]: value };
      const validities = { ...state.validities, [id]: isValid };
      let isFormValid = true;

      for (let key in validities) {
        isFormValid = isFormValid && validities[key];
      }

      return {
        ...state,
        values,
        validities,
        isFormValid,
      };
    default:
      return state;
  }
};

function ViewAndEditEvent() {
  const history = useHistory();
  const user = useSelector(selectUser);

  const { eventId } = useParams();
  const events = useSelector(selectEvents);
  const currentEvent = events.filter((event) => event._id === eventId)[0];
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [poster, setPoster] = useState(null);
  const [participants] = useState(currentEvent.participants);

  const eventData = currentEvent;

  useEffect(() => {
    if (eventId) {
      dispatchFormState({
        type: SET_FORM,
        payload: {
          values: {
            title: eventData.title,
            description: eventData.description,
            meetUrl: eventData.meetUrl,
            dateTime: eventData.dateTime,
          },
          validities: {
            title: true,
            description: true,
            meetUrl: true,
            dateTime: true,
          },
          isFormValid: true,
        },
      });
    }
  }, [eventId, dispatchFormState, eventData]);

  const selectPoster = (event) => {
    if (event.target.files) {
      setPoster(event.target.files[0]);
    }
  };

  const onInputChange = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: UPDATE_FORM,
        payload: {
          id,
          value,
          isValid,
        },
      });
    },
    [dispatchFormState]
  );

  const formSubmitHandler = useCallback(
    async (event) => {
      event.preventDefault();

      if (!formData.isFormValid) {
        alert("Check form for errors!");
        return;
      }

      const updatedEvent = {
        ...eventData,
        ...formData.values,
        clubName: user.clubName,
        poster,
        prevData: eventData,
      };
      try {
        setIsLoading(true);
        let posterValue = currentEvent.poster;
        if (poster) {
          let posterData = new FormData();
          posterData.append("file", poster, poster.name);
          await axios({
            method: "post",
            url: "/upload/images",
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${posterData._boundary}`,
            },
            data: posterData,
          })
            .then((result) => {
              if (result.status !== 200) {
                alert("Not able to fetch events");
                return;
              } else {
                posterValue = result.data.filename;
                return;
              }
            })
            .catch((err) => {
              if (err != null) {
                alert("Something is wrong with uploading the image!");
                return;
              }
            });
        }
        updatedEvent.poster = posterValue;
        await axios({
          method: "put",
          url: "/club/event/update",
          data: updatedEvent,
        })
          .then((result) => {
            if (result.status !== 200) {
              alert("Not able to fetch events");
              return;
            } else {
              // dispatch(setUser(result.data));
              dispatchFormState({ type: RESET_FORM });
              history.goBack();
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              alert("Something is wrong");
              return;
            }
          });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
    [
      formData.isFormValid,
      formData.values,
      eventData,
      user.clubName,
      poster,
      currentEvent.poster,
      history,
    ]
  );

  return (
    <AddEventContainer>
      <EventCard>
        <div className="event_heading">
          <h1>{eventId ? "Edit" : "Create"} an Event</h1>
        </div>
        <form method="POST">
          <FormInput
            label="title"
            onInputChange={onInputChange}
            inputType="text"
            id="title"
            required
            initiallyValid={formData.validities.title}
            initialValue={formData.values.title}
          />
          <InputContainer>
            <LabelField>Description</LabelField>
            <TextArea
              name="Event Description"
              id="description"
              cols="30"
              rows="10"
              required
              value={formData.values.description}
              onChange={(event) =>
                onInputChange(
                  "description",
                  event.target.value,
                  event.target.value.length ? true : false
                )
              }
            />
          </InputContainer>
          <InputContainer>
            <LabelField>Choose Poster</LabelField>
            <input
              type="file"
              name="poster"
              id="poster"
              required
              onChange={selectPoster}
              accept="image/*"
            />
          </InputContainer>
          <FormInput
            label="Meet url"
            inputType="text"
            onInputChange={onInputChange}
            id="meetUrl"
            required
            initiallyValid={formData.validities.meetUrl}
            initialValue={formData.values.meetUrl}
          />
          <InputContainer>
            <LabelField>Date/Time</LabelField>
            <StyledDateTime
              onChange={(event) =>
                onInputChange("dateTime", event._d?.toString(), true)
              }
            />
          </InputContainer>
          <AlignCenter>
            <SubmitButton onClick={formSubmitHandler} disabled={isLoading}>
              {isLoading
                ? eventId
                  ? "Updating..."
                  : "Adding..."
                : eventId
                ? "Update"
                : "Add"}
            </SubmitButton>
          </AlignCenter>
        </form>
      </EventCard>
      {eventId && (
        <ParticipantCard id="print__this" onClick={() => window.print()}>
          <h3>
            Participants <Badge>{participants.length}</Badge>
          </h3>
          <ParticipantsTable>
            <TableRow>
              <TableColumnHeader>Sno.</TableColumnHeader>
              <TableColumnHeader>Name</TableColumnHeader>
              <TableColumnHeader>Course</TableColumnHeader>
              <TableColumnHeader>Year</TableColumnHeader>
              <TableColumnHeader>WhatsApp Contact</TableColumnHeader>
            </TableRow>
            {participants.map((participant, index) => (
              <TableRow key={index}>
                <TableColumn>{index + 1}</TableColumn>
                <TableColumn>{participant.name}</TableColumn>
                <TableColumn>{participant.course}</TableColumn>
                <TableColumn>{participant.year}</TableColumn>
                <TableColumn>{participant.whatsAppPhone}</TableColumn>
              </TableRow>
            ))}
          </ParticipantsTable>
        </ParticipantCard>
      )}
    </AddEventContainer>
  );
}

export default ViewAndEditEvent;

const AddEventContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: calc(100vh - 60px);
  background-color: rgba(0, 0, 0, 0.83);
  padding: 10px;
  @media only screen and (max-width: 500) {
    padding: 0px;
    width: 90%;
  }
`;

const EventCard = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.56);
  width: 60%;

  @media only screen and (max-width: 500) {
    padding: 0px;
    width: 90%;
  }

  @media print {
    display: none;
  }
`;

const ParticipantCard = styled(EventCard)`
  margin-top: 40px;
  width: 90%;

  @media print {
    display: block;
  }
`;

const Badge = styled.p`
  display: inline-block;
  background: var(--primaryColor);
  text-align: center;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.56);
`;

const ParticipantsTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: flex;

  :nth-child(even) {
    background: #ccc;
  }
`;

const TableColumn = styled.div`
  display: flex;
  margin: 0 5px;
  font-size: 1.1rem;

  :nth-child(1) {
    width: 5%;
  }
  :nth-child(2) {
    width: 25%;
  }
  :nth-child(3) {
    width: 40%;
  }
  :nth-child(4) {
    width: 20%;
  }
  :nth-child(5) {
    width: 30%;
  }
`;

const TableColumnHeader = styled(TableColumn)`
  font-weight: bolder;
  margin-top: 10px;
`;

const StyledInput = css`
  min-width: 60%;
  padding: 5px;
  border: none;
  outline-width: 0;
  border-bottom: 2px solid #033649;
  background: transparent;
  padding-right: 30px;
`;

const TextArea = styled.textarea`
  ${StyledInput}
`;

const StyledDateTime = styled(DateTime)`
  ${StyledInput}
`;

const AlignCenter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
