import React from "react";
import styled from "styled-components";

function ClubDescription() {
  return (
    <DescriptionContainer>
      <DescriptionTitle>Our Clubs Elucidation</DescriptionTitle>
      <DescriptionBox>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Technology has revolutionized the world and holds the key to our future. Department of Computer Science and Engineering, CTAE Udaipur, organize various technical activities at regular intervals in association with Programming club.
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Programming Club is a platform where students with different interests such as, coding, App development, Machine Learning, and Web Designing. The club is responsible for conducting programming events for the students of CTAE Udaipur.
      </DescriptionBox>
    </DescriptionContainer>
  );
}

export default ClubDescription;

const DescriptionContainer = styled.section`
  margin-top: 60px;
  width: 100%;
  padding: 50px 80px 73px 80px;
  background: var(--primaryColor);

  @media only screen and (max-width: 500px) {
    padding: 50px 20px;
  }
`;

const DescriptionTitle = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 20px;
`;

const DescriptionBox = styled.div`
  font-size: 1.2rem;
  text-align: justify;
`;
