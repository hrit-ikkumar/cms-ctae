import React, { useCallback, useReducer, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../features/authSlice";
import styled from "styled-components";

import axios from "axios";
import FormInput from "../components/FormInput";

import {
  RegisterScreenContainer,
  FormContainer,
  FromHeaderText,
  FromWrapper,
  SubmitButton,
  FromLinkContainer,
} from "./RegisterScreen";

const UPDATE_FORM = "UPDATE_FORM";
const RESET_FORM = "RESET_FORM";
const initialState = {
  values: {
    email: "",
    password: "",
    clubName: "",
  },
  validities: {
    email: false,
    password: false,
    clubName: false,
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

function LoginScreen() {
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
        alert("Check form for errors!");
        return;
      }

      try {
        setIsLoading(true);
        const loginData = {
          email: formData.values.email,
          password: formData.values.password,
          clubName: formData.values.clubName,
        };
        await axios({
          method: "post",
          url: "/auth/login",
          data: loginData,
        })
          .then((res) => {
            if (res.status !== 200) {
              alert("Not able to create user");
            } else {
              dispatchFormState({ type: RESET_FORM });
              setIsLoading(false);
              dispatch(signIn(res.data));
              history.push("/");
              return;
            }
          })
          .catch((err) => alert(err));
        dispatchFormState({ type: RESET_FORM });
        setIsLoading(false);
        history.replace("/");
      } catch (error) {
        setIsLoading(false);
        alert(error.message);
      }
    },
    [dispatch, formData, dispatchFormState, history]
  );

  return (
    <RegisterScreenContainer>
      <FormContainer>
        <FromHeaderText>Sign In</FromHeaderText>
        <FromWrapper action="" method="POST">
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
            id="password"
            onInputChange={onInputChange}
            label="password"
            inputType="password"
            required
            minLength={6}
            errorText="Password must be at least 6 characters long!"
          />
          <FormInput
            id="clubName"
            onInputChange={onInputChange}
            initialValue={clubName || ""}
            initiallyValid={clubName !== null}
            label="Club Name"
            inputType="text"
            required
            minLength={6}
            errorText="Club Name should be there!"
          />
          <AlignCenter>
            <SubmitButton
              type="submit"
              onClick={formSubmitHandler}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </SubmitButton>
          </AlignCenter>
        </FromWrapper>
        <FromLinkContainer>
          Don't have an account?{" "}
          <Link to={clubName ? `/register?clubName=${clubName}` : "/register"}>
            Register Here
          </Link>
        </FromLinkContainer>
      </FormContainer>
    </RegisterScreenContainer>
  );
}

export default LoginScreen;

const AlignCenter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
