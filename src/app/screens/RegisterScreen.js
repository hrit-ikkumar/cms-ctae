import React, { useCallback, useReducer, useState } from "react";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import FormInput from "../components/FormInput";
import { auth, db } from "../features/firebase";
import styled from "styled-components";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";
const initialState = {
  values: {
    name: "",
    email: "",
    course: "",
    year: "",
    phone: "",
    whatsappPhone: "",
    password: "",
  },
  validities: {
    name: false,
    email: false,
    course: false,
    year: false,
    phone: false,
    whatsappPhone: false,
    password: false,
  },
  isFormValid: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case RESET_FORM:
      return initialState;

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

function RegisterScreen() {
  const history = useHistory();
  const [formData, dispatchFormState] = useReducer(formReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const { user } = await auth.createUserWithEmailAndPassword(
          formData.values.email,
          formData.values.password
        );
        const registrationData = {
          uid: user.uid,
          type: "user",
          name: formData.values.name,
          email: user.email,
          course: formData.values.course,
          year: formData.values.year,
          phone: formData.values.phone,
          whatsappPhone: formData.values.whatsappPhone,
        };
        await db.collection("users").doc(user.uid).set(registrationData);
        // dispatch(signIn(formData.values));
        dispatchFormState({ type: RESET_FORM });
        setIsLoading(false);
        history.replace("/");
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
    [formData, history]
  );

  return (
    <RegisterScreenContainer>
      <FormContainer>
        <FromHeaderText>Sign Up</FromHeaderText>
        <FromWrapper action="" method="POST">
          <FormInput
            onInputChange={onInputChange}
            label="Name"
            id="name"
            required
            minLength={3}
            errorText="Please enter a valid name!"
          />
          <FormInput
            onInputChange={onInputChange}
            label="email"
            inputType="email"
            id="email"
            email
            required
            errorText="Invalid Email!"
          />
          <FormInput
            onInputChange={onInputChange}
            label="course"
            id="course"
            required
            errorText="Course is required!"
          />
          <FormInput
            onInputChange={onInputChange}
            label="year"
            id="year"
            required
            errorText="Year is required!"
          />
          <FormInput
            onInputChange={onInputChange}
            label="Phone"
            id="phone"
            required
            minLength={10}
            errorText="Invalid Phone Number!"
          />
          <FormInput
            onInputChange={onInputChange}
            label="whatsapp Phone"
            id="whatsappPhone"
            required
            minLength={10}
            errorText="Invalid WhatsApp Contact!"
          />
          <FormInput
            id="password"
            onInputChange={onInputChange}
            label="password"
            inputType="password"
            required
            minLength={6}
          />
          <SubmitButton
            type="submit"
            onClick={formSubmitHandler}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </SubmitButton>
        </FromWrapper>
        <FromLinkContainer>
          Already have an account? <Link to="/login">Login Here</Link>
        </FromLinkContainer>
      </FormContainer>
    </RegisterScreenContainer>
  );
}

export default RegisterScreen;

export const RegisterScreenContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://i.redd.it/zgmi8frme3u31.jpg") center/cover fixed
    no-repeat;

  @media only screen and (max-width: 501px) {
    padding: 20px 5px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.2)
  );
  border-radius: 2rem;
  backdrop-filter: blur(1rem);
  overflow: hidden;
  z-index: 4;
  padding: 20px 30px;
`;

export const FromHeaderText = styled.h1`
  margin-bottom: 20px;
  font-family: "Bree Serif", serif;
`;

export const FromWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  margin-left: 10px !important;
  background-color: #331e47 !important;
  color: white !important;
  width: 250px;

  :hover {
    background-color: #000 !important;
  }
`;

export const FromLinkContainer = styled.span`
  margin-top: 10px;
  margin-left: 10px;

  > a {
    color: #050307;
    font-weight: 600;
  }
`;
