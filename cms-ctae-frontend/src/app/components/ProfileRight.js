import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectClubInfo, selectClubPostData } from "../features/clubSlice";

function ProfileRight() {
  const clubInfo = useSelector(selectClubInfo);
  const clubPost = useSelector(selectClubPostData);
  return (
    <ProfileRightContainer id="members">
      <ProfileRightTitle>Club Members</ProfileRightTitle>
      {clubInfo && clubInfo.clubMembers &&
        clubInfo.clubMembers.map((_, index) => (
          <MemberCard key={index}>
            <MemberImage src={clubInfo.clubMembers[index].image} />
            <MemberDetails>
              <MemberName>{clubInfo.clubMembers[index].name}</MemberName>
              <MemberTitle>{clubInfo.clubMembers[index].position}</MemberTitle>
            </MemberDetails>
          </MemberCard>
        ))}
    </ProfileRightContainer>
  );
}

export default ProfileRight;

export const ProfileRightContainer = styled.section`
  display: flex;
  position: sticky;
  top: 0;
  right: 0;
  width: 20%;
  min-width: 260px;
  flex-direction: column;
  background: var(--primaryColor);
  border-radius: 10px;
  padding: 20px;
  align-items: center;

  @media only screen and (max-width: 962px) {
    position: static;
  }

  @media only screen and (max-width: 560px) {
    width: 100%;
  }
`;

const ProfileRightTitle = styled.h1`
  color: #fff;
`;

const MemberCard = styled.div`
  display: flex;
  width: 90%;
  margin-top: 18px;
  align-items: center;
`;

const MemberImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberDetails = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.h3``;

const MemberTitle = styled.p`
  color: #708090;
`;
