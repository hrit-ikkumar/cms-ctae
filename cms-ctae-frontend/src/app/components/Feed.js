import React from "react";
import styled from "styled-components";
import moment from "moment";

function Feed() {
  return (
    <FeedContainer>
      <FeedImage
        src={`https://www.ctae.ac.in/images/editorFiles/image/CTAE%20DEPT/CSE/Workshops_events/Github%2001.jpg`}
        loading="lazy"
      />
      <FeedDetailsContainer>
        <UserDetails>
          <MemberName>Hritik Kumar Sharma </MemberName>
          <MemberTitle>Coordinator</MemberTitle>
        </UserDetails>
        <TimeStamp>
          Posted On - {moment(new Date()).format("MMM Do YYYY, HH:mm")}
        </TimeStamp>
      </FeedDetailsContainer>
      <Description>
      One of our most recent updates is MY ABSOLUTE FAVORITE- Club staff can now add your own activities! 
      Activities you create in MyFuture will be available to your entire organization – and once it has been created, 
      you will be able to assign members to the activity, track completions, project uploads, and anything else you can do with a traditional MyFuture activity. 
      For those who work to get local funders, 
      you can also provide some local funder recognition on the activities pages themselves. You’ll also be able to go back and edit, 
      and publish and unpublish as needed. And if you want to share the activity with ALL Clubs, 
      you can let BGCA know, and the team here can make it available to everyone. I ABSOUTELY CANNOT WAIT to start seeing yours!!!!!
      </Description>
    </FeedContainer>
  );
}

export default Feed;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primaryColor);
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  margin-top: 20px;

  :last-child {
    margin-bottom: 20px;
  }
`;

const FeedImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const FeedDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: space-between;
`;

const UserDetails = styled.div``;

const MemberName = styled.h2``;

const MemberTitle = styled.h4`
  color: #708090;
`;

const TimeStamp = styled.p`
  color: #ccc;
`;

const Description = styled.p`
  padding: 10px;
  text-align: justify;
`;
