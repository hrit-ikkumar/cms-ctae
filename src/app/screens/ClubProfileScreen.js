import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import ProfileLeft from "../components/ProfileLeft";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";

function ClubProfileScreen() {
  const { clubId } = useParams();

  return (
    <ClubProfileContainer>
      <ProfileLeft clubData={clubId} />
      <ProfileMiddle />
      <ProfileRight />
    </ClubProfileContainer>
  );
}

export default ClubProfileScreen;

export const ClubProfileContainer = styled.main`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  background: var(--headerColor);
  color: #fff;
  padding: 20px 5px;

  @media only screen and (max-width: 962px) {
  }
`;
