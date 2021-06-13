import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router";

function Hero() {
  const history = useHistory();

  const goToEventsHandler = () => {
    history.push("/events");
  };

  return (
    <HeroContainer>
      <ClubDescription>
        <Test>Team work is dream work!</Test>
        <ButtonsContainer>
          <EventsButton onClick={goToEventsHandler}>Go To Events</EventsButton>
          <ClubsButton href="#clubs">Our Clubs</ClubsButton>
        </ButtonsContainer>
      </ClubDescription>
    </HeroContainer>
  );
}

export default Hero;

const HeroContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6)
    url("https://images.unsplash.com/photo-1549231517-daf62e76a86e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1103&q=80")
    center/cover fixed no-repeat;
  background-blend-mode: darken;
`;

const ClubDescription = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  width: 50%;
  font-size: 5rem;
  font-family: "Lato", sans-serif;
  color: #fff;
  user-select: none;

  @media only screen and (max-width: 1095px) {
    font-size: 2px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;
const Test = styled.p`
  font-weight: 600;

  @media only screen and (max-width: 1095px) {
    font-size: 2rem;
  }
`;

const EventsButton = styled(Button)`
  padding: 8px 20px !important;
  border: 2px solid #fff !important;
  color: #fff !important;
  transition: all 0.5s ease-in-out !important;

  :hover {
    color: #000 !important;
    background: #fff !important;
  }

  @media only screen and (max-width: 1095px) {
    padding: 4px 10px !important;
  }
`;

const ClubsButton = styled(EventsButton)`
  margin-left: 20px !important;
`;
