import styled from "styled-components";

import Hero from "../components/Hero";
import Clubs from "../components/Clubs";
import Gallery from "../components/Gallery";
import ClubDescription from "../components/ClubDescription";
import Testimonial from "../components/Testimonial";
import EventSchedule from "../components/EventSchedule";
import Footer from "../components/Footer";

function HomeScreen() {
  return (
    <HomeScreenContainer>
      <Hero />
      <Clubs />
      <EventSchedule />
      <Gallery />
      <ClubDescription />
      <Testimonial />
      <Footer />
    </HomeScreenContainer>
  );
}

export default HomeScreen;

const HomeScreenContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: var(--headerColor);
  color: #fff;
`;
