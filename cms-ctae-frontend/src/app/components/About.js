import React from "react";
import styled from "styled-components";

function About() {
  return (
    <AboutContainer id="about__us">
      {Array(3)
        .fill()
        .map((_, index) => (
          <AboutWrapper key={index}>
            <LeftContainer>
              <AboutImage
                src="https://images.pexels.com/photos/2763927/pexels-photo-2763927.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </LeftContainer>
            <RightContainer>
              <h1>About Us</h1>
              <p>
                Project Name: Club Management Systems
                <br/>
                Team Members: Hritik Kumar Sharma &amp; Mudit Jain
                <br />
                Final Year Project!
              </p>
            </RightContainer>
          </AboutWrapper>
        ))}
    </AboutContainer>
  );
}

export default About;

const AboutContainer = styled.div``;

const AboutWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;

  :nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const AboutImage = styled.img`
  width: 80%;
  max-width: 381px;
  height: 60vh;
  max-height: 400px;
  object-fit: cover;
  margin: 40px;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  height: 400;
  width: 30%;
  font-size: 21px;
  font-weight: bold;
  margin: 40px;

  @media only screen and (max-width: 740px) {
    width: 80%;
  }
`;
