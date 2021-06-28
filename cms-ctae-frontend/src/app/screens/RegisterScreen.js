import React, { useCallback, useReducer, useState } from "react";
import { Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import FormInput from "../components/FormInput";
import { signIn } from "../features/authSlice";
import styled from "styled-components";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";

const initialState = {
  values: {
    name: "",
    email: "",
    clubName: "",
    clubPosition: "",
    course: "",
    year: "",
    phone: "",
    whatsAppPhone: "",
    password: "",
  },
  validities: {
    name: false,
    email: false,
    course: false,
    clubName: false,
    clubPosition: false,
    year: false,
    phone: false,
    whatsAppPhone: false,
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
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const clubName = params.get("clubName");

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
        alert("Please check your inputs in form!");
        return;
      }
      try {
        setIsLoading(true);
        const registrationData = {
          type: "user",
          name: formData.values.name,
          email: formData.values.email,
          year: formData.values.year,
          password: formData.values.password,
          course: formData.values.course,
          clubName: formData.values.clubName,
          clubPosition: formData.values.clubPosition,
          phone: formData.values.phone,
          whatsAppPhone: formData.values.whatsAppPhone,
        };
        await axios({
          method: "post",
          url: "/auth/signUp",
          data: registrationData,
        })
          .then((res) => {
            if (res.status !== 200) {
              setIsLoading(false);
              alert(
                "We are not able to create your account. Please check credentials."
              );
            } else {
              dispatchFormState({ type: RESET_FORM });
              setIsLoading(false);
              dispatch(signIn(res.data));
              history.push("/");
              return;
            }
          })
          .catch((err) => {
            setIsLoading(false);
            alert(
              "We are not able to create your account. Please check credentials."
            );
          });
      } catch (error) {
        setIsLoading(false);
        alert("This account already exits or please check your information.");
      }
    },
    [dispatch, formData, history]
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
            label="Club Name"
            initialValue={clubName || ""}
            initiallyValid={clubName !== null}
            id="clubName"
            required
            minLength={3}
            errorText="Invalid Club Name"
          />
          <FormInput
            onInputChange={onInputChange}
            label="Club Position"
            id="clubPosition"
            required
            minLength={3}
            errorText="Invalid Club Position"
          />
          <FormInput
            onInputChange={onInputChange}
            label="whatsapp Phone"
            id="whatsAppPhone"
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
          Already have an account?{" "}
          <Link to={clubName ? `/login?clubName=${clubName}` : "/login"}>
            Login Here
          </Link>
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
