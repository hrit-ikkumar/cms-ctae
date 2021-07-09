import React, { useCallback, useState, useReducer } from "react";
import DateTime from "react-datetime";
import { useHistory } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import FormInput, { InputContainer, LabelField } from "../components/FormInput";

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

function AddEvent() {
  const history = useHistory();
  const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [poster, setPoster] = useState("");

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

      const newEvent = {
        ...formData.values,
        participants: [],
        clubName: user.clubName,
        poster,
      };

      try {
        setIsLoading(true);
        let posterValue =
          "https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2019/07/GP-socialdistancing-04_Blog-Header.png";
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
        newEvent.poster = posterValue;
        await axios({
          method: "post",
          url: "/club/event/create",
          data: newEvent,
        })
          .then((result) => {
            if (result.status !== 200) {
              alert("Not able to fetch events");
              return;
            } else {
              dispatchFormState({ type: RESET_FORM });
              history.replace("/events");
              // dispatch(setUser(result.data));
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
    [formData.isFormValid, formData.values, user.clubName, poster, history]
  );

  return (
    <AddEventContainer>
      <EventCard>
        <div className="event_heading">
          <h1>{"Create"} an Event</h1>
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
              ? null
                ? "Updating..."
                : "Adding..."
              : null
              ? "Update"
              : "Add"}
          </SubmitButton>
        </form>
      </EventCard>
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
