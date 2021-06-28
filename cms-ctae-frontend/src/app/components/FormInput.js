import React, { useEffect, useReducer, useState } from "react";
import { Visibility, VisibilityOff, CheckCircle } from "@material-ui/icons";
import styled from "styled-components";

const INPUT_CHANGE = "INPUT_CHANGE";
const SET_INPUT = "SET_INPUT";

const inputReducer = (state, action) => {
  switch (action.type) {
    case SET_INPUT:
      return { ...state, ...action.payload };

    case INPUT_CHANGE:
      const { value, isValid } = action.payload;
      return {
        ...state,
        value,
        isValid,
        touched: true,
      };

    default:
      return state;
  }
};

function FormInput({
  inputType,
  label,
  id,
  required,
  min,
  max,
  minLength,
  email,
  initialValue,
  initiallyValid,
  onInputChange,
  errorText,
  labelColor,
  ...rest
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [{ value, isValid, touched }, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid ? initiallyValid : false,
    touched: false,
  });

  useEffect(() => {
    dispatch({
      type: SET_INPUT,
      payload: {
        value: initialValue,
        isValid: initiallyValid,
        touched: false,
      },
    });
  }, [initialValue, initiallyValid]);

  useEffect(() => {
    onInputChange(id, value, isValid);
  }, [id, value, isValid, onInputChange]);

  const onValueChangeHandler = (event) => {
    const text = event.target.value;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min !== null && +text < min) {
      isValid = false;
    }
    if (max !== null && +text > max) {
      isValid = false;
    }
    if (minLength !== null && text.length < minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGE,
      payload: {
        value: text,
        isValid,
      },
    });
  };

  return (
    <InputContainer>
      <LabelField labelColor={labelColor}>{label.toUpperCase()}</LabelField>
      <FieldContainer>
        <InputField
          textColor={labelColor}
          errorBorder={touched && !isValid ? true : false}
          required
          {...rest}
          type={
            inputType
              ? id.toLowerCase().includes("password")
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : inputType
              : "text"
          }
          name={label}
          id={id}
          value={value || ""}
          onChange={onValueChangeHandler}
        />
        {id.toLowerCase().includes("password") ? (
          <RightIcon
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
          >
            {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
          </RightIcon>
        ) : (
          isValid && (
            <RightIcon>
              <StyledCheckCircle />
            </RightIcon>
          )
        )}
      </FieldContainer>
      {touched && !isValid && (
        <InputError>{errorText ? errorText : "Invalid Input!"}</InputError>
      )}
    </InputContainer>
  );
}

export default FormInput;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const LabelField = styled.h3`
  margin-left: 3.5px;
  color: ${({ labelColor }) =>
    labelColor ? labelColor : "rgba(0, 0, 0, 0.8)"};
  font-family: "Saira Condensed", sans-serif;
`;
const FieldContainer = styled.div`
  display: flex;
`;
const InputField = styled.input`
  min-width: 300px;
  padding: 5px;
  border: none;
  outline-width: 0;
  border-bottom: 2px solid
    ${({ errorBorder }) => (errorBorder ? "var(--errorColor)" : "#033649")};
  background: transparent;
  padding-right: 30px;
  color: ${({ textColor }) => (textColor ? textColor : "#000")};
`;

const RightIcon = styled.div`
  margin-left: -22px;
  > .MuiSvgIcon-root {
    cursor: pointer;
  }
`;

const StyledCheckCircle = styled(CheckCircle)`
  color: #009900;
`;

const InputError = styled.span`
  position: absolute;
  left: 10px;
  bottom: -4px;
  font-size: smaller;
  color: var(--errorColor);
`;
