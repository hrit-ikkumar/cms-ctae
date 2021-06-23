import styled from "styled-components";

function EventSchedule() {
  return (
    <EventScheduleContainer>
      <EventScheduleHeading>Programs</EventScheduleHeading>
      <EventScheduleCard>
        <EventTime>
          10:00 <TimeTypography>AM</TimeTypography>
        </EventTime>
        <EventDescription>
          <EventTitle>LinkedIn & Git Workshop</EventTitle>
          <ClubName>Programming Club</ClubName>
        </EventDescription>
      </EventScheduleCard>

    </EventScheduleContainer>
  );
}

export default EventSchedule;

const EventScheduleContainer = styled.section`
  margin-top: 60px;
  width: 100%;
  padding: 50px 80px;
  background: var(--primaryColor);

  @media only screen and (max-width: 500px) {
    padding: 50px 20px;
  }
`;

const EventScheduleHeading = styled.h1`
  font-size: 3rem;
  margin-left: 2%;
  margin-bottom: 30px;
`;

const EventScheduleCard = styled.div`
  display: flex;
  border-top: 1px solid #888;
  padding: 30px 20px;
`;

const EventTime = styled.h3`
  margin-right: 20%;
`;

const EventDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.h2``;

const ClubName = styled.h4`
  color: #888;
`;

const TimeTypography = styled.span`
  font-size: 0.8rem;
`;
