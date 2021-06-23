import React from "react";
import styled from "styled-components";

import DevTwo from "../assets/images/harshit.jpg";

function OurTeam() {
  return (
    <OurTeamContainer>
      <OurTeamHeading>
        <h1>Developers Team</h1>
      </OurTeamHeading>
      <ProfileContainer>
        {Array(3)
          .fill()
          .map((_, index) => (
            <OurTeamProfile key={index}>
              <ProfileImage src={DevTwo} alt="name" />
              <h2>Hritik Kumar Sharma</h2>
              <p>Bhagwan</p>
              <TeamText>
                Lorem ipsum, dolor sit amet consectetur adipisicing
              </TeamText>
            </OurTeamProfile>
          ))}
      </ProfileContainer>
    </OurTeamContainer>
  );
}

export default OurTeam;

const OurTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const OurTeamHeading = styled.div`
  > h1 {
    font-size: 3rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
`;

const OurTeamProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 40px;
  height: 207px;

  > p {
    color: #ccc;
    font-size: 15px;
    text-transform: uppercase;
  }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;
`;

const TeamText = styled.p`
  width: 300px;
  color: #000 !important;
`;
