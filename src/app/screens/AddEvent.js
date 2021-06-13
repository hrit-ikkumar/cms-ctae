import React, { useCallback, useState, useReducer, useEffect } from "react";
import DateTime from "react-datetime";
import { useHistory, useParams } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import FormInput, { InputContainer, LabelField } from "../components/FormInput";
import { db, storage } from "../features/firebase";
import { selectEvents } from "../features/eventsSlice";
import { SubmitButton } from "./RegisterScreen";

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

function AddEvent() {
  const history = useHistory();
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [poster, setPoster] = useState(null);
  const [participants, setParticipants] = useState([]);
  const events = useSelector(selectEvents);
  const { eventId } = useParams();
  const eventData = events.find((event) => event.id === eventId);

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

  useEffect(() => {
    if (eventId) {
      const unsubscribe = db
        .collection("events")
        .doc(eventId)
        .collection("participants")
        .onSnapshot((snapshot) =>
          setParticipants(snapshot.docs.map((doc) => doc.data()))
        );

      return unsubscribe;
    }
  }, [eventId]);

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

      let url = eventData ? eventData.poster : null;

      try {
        setIsLoading(true);
        if (poster) {
          const imageType = poster.name.split(".").pop();
          const imageName = `IMG-${Date.now()}.${imageType}`;

          const uploadTask = await storage
            .ref(`posters/${imageName}`)
            .put(poster);
          url = await uploadTask.ref.getDownloadURL();
        }

        if (eventId) {
          await db
            .collection("events")
            .doc(eventId)
            .update({ ...formData.values, poster: url });
        } else {
          await db
            .collection("events")
            .add({ ...formData.values, poster: url });
        }
        dispatchFormState({ type: RESET_FORM });
        setIsLoading(false);
        history.replace("/events");
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
    [formData, dispatchFormState, history, poster, eventData, eventId]
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
          <SubmitButton onClick={formSubmitHandler} disabled={isLoading}>
            {isLoading
              ? eventId
                ? "Updating..."
                : "Adding..."
              : eventId
              ? "Update"
              : "Add"}
          </SubmitButton>
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
              <TableRow key={participant.uid}>
                <TableColumn>{index + 1}</TableColumn>
                <TableColumn>{participant.name}</TableColumn>
                <TableColumn>{participant.course}</TableColumn>
                <TableColumn>{participant.year}</TableColumn>
                <TableColumn>{participant.whatsappPhone}</TableColumn>
              </TableRow>
            ))}
          </ParticipantsTable>
        </ParticipantCard>
      )}
    </AddEventContainer>
  );
}

export default AddEvent;

const AddEventContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: calc(100vh - 60px);
  background-color: rgba(0, 0, 0, 0.83);
  padding: 20px 0;
`;

const EventCard = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.56);

  @media only screen and (max-width: 330px) {
    padding: 20px 5px;
  }

  @media print {
    display: none;
  }
`;

const ParticipantCard = styled(EventCard)`
  margin-top: 40px;

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
    width: 40px;
  }
  :nth-child(2) {
    width: 150px;
  }
  :nth-child(3) {
    width: 80px;
  }
  :nth-child(4) {
    width: 45px;
  }
  :nth-child(5) {
    width: 150px;
  }
`;

const TableColumnHeader = styled(TableColumn)`
  font-weight: bolder;
  margin-top: 10px;
`;

const StyledInput = css`
  min-width: 250px;
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
