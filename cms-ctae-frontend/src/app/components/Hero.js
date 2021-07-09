import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

function Hero() {
  const history = useHistory();
  const user = useSelector(selectUser);

  const goToEventsHandler = () => {
    history.push("/events");
  };

  const goToEventsHandlerHome = () => {
    document.getElementById("programSection").scrollIntoView();
  };
  const goToClub = () => {
    history.push("/club");
  };
  const goToClubHome = () => {
    document.getElementById("clubs").scrollIntoView();
  };
  return (
    <HeroContainer>
      <ClubDescription>
        <Test>Team work is dream work!</Test>
        <ButtonsContainer>
          <EventsButton
            onClick={user ? goToEventsHandler : goToEventsHandlerHome}
          >
            {user ? "Go To Events" : "Go to Programs"}
          </EventsButton>
          <ClubsButton onClick={user ? goToClub : goToClubHome}>
            {user ? "Our Club" : "Our Clubs"}
          </ClubsButton>
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
    url("https://news.itmo.ru/images/news/big/p4835.jpg")
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
