import { Button } from "@material-ui/core";
import styled from "styled-components";

function ClubButton({ children, onButtonPress, margin, style, buttonColor }) {
  return (
    <StyledButton
      onClick={onButtonPress}
      margin={margin}
      style={{ ...style }}
      buttonColor={buttonColor}
    >
      {children}
    </StyledButton>
  );
}

export default ClubButton;

const StyledButton = styled(Button)`
  margin: ${({ margin }) => (margin ? margin : "20px 0 0 10px")} !important;
  background: ${({ buttonColor }) =>
    buttonColor ? buttonColor : "var(--secondaryButtonColor)"} !important;
  color: #fff !important;
  padding: 10px 30px !important;
  transition: 0.5s ease-in-out !important;

  :hover {
    background-color: var(--headerColor) !important;
    color: ${({ buttonColor }) =>
      buttonColor ? buttonColor : "#fff"} !important;
  }
`;
