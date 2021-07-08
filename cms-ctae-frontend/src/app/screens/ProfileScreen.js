import React, { useReducer, useCallback } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import FormInput from "../components/FormInput";
import { selectUser, setUser } from "../features/authSlice";

import { FromHeaderText } from "./RegisterScreen";
import axios from "axios";

const UPDATE_FORM = "UPDATE_FORM";
const initialState = {
  values: {
    name: "",
    email: "",
    course: "",
    year: "",
    phone: "",
    whatsAppPhone: "",
  },
  validities: {
    name: false,
    email: false,
    course: false,
    year: false,
    phone: false,
    whatsAppPhone: false,
  },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
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

function ProfileScreen() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);

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

      try {
        const prevData = user;
        const updatedData = {
          name: formData.values.name,
          email: user.email,
          course: formData.values.course,
          year: formData.values.year,
          phone: formData.values.phone,
          whatsAppPhone: formData.values.whatsAppPhone,
          prevData: prevData,
        };
        // update profile data
        await axios({
          method: "post",
          url: "/auth/updateProfile",
          data: updatedData,
        })
          .then((result) => {
            if (result.status !== 200) {
              alert("Not able to fetch events");
              return;
            } else {
              dispatch(setUser(result.data));
              return;
            }
          })
          .catch((err) => {
            if (err != null) {
              alert("Something is wrong");
              return;
            }
          });
      } catch (error) {
        alert(error.message);
      }
    },
    [
      dispatch,
      formData.isFormValid,
      formData.values.course,
      formData.values.name,
      formData.values.phone,
      formData.values.whatsAppPhone,
      formData.values.year,
      user,
    ]
  );

  return (
    <ProfileScreenContainer>
      <ProfileWrapper>
        <FromHeaderText>Your Profile</FromHeaderText>
        <ProfileDetailsForm action="" method="POST">
          <FormInput
            label="Name"
            id="name"
            required
            minLength={3}
            initialValue={user.name}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Email"
            id="email"
            email
            initialValue={user.email}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Course"
            id="course"
            required
            initialValue={user.course}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Year"
            id="year"
            required
            initialValue={user.year}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="Phone"
            id="phone"
            required
            minLength={10}
            initialValue={user.phone}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
          <FormInput
            label="whatsApp Phone"
            id="whatsAppPhone"
            required
            minLength={10}
            initialValue={user.phone}
            initiallyValid={true}
            onInputChange={onInputChange}
          />
        </ProfileDetailsForm>
        <SaveButton onClick={formSubmitHandler}>Save changes</SaveButton>
      </ProfileWrapper>
    </ProfileScreenContainer>
  );
}

export default ProfileScreen;

const ProfileScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  min-height: calc(100vh - 60px);
  background: url("https://images.pexels.com/photos/1840624/pexels-photo-1840624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center/cover fixed no-repeat;
`;

const ProfileWrapper = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 280px;
  max-width: 600px;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 2rem;
  backdrop-filter: blur(1rem);
`;

const ProfileDetailsForm = styled.form`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const SaveButton = styled(Button)`
  background-color: #160d1f !important;

  padding: 7px 50px !important;
  color: white !important;
`;
