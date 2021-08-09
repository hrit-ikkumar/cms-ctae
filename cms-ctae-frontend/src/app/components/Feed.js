import React from "react";
import styled from "styled-components";
import moment from "moment";

function Feed({ feedData }) {
  const { link, title, author, authorTitle, dateTime, content, imageLink } =
    feedData;

  return (
    <FeedContainer>
      <FeedImage src={`/upload/images/view/${imageLink}`} loading="lazy" />
      <Title>{title}</Title>
      <FeedDetailsContainer>
        <UserDetails>
          <MemberName>{author}</MemberName>
          <MemberTitle>{authorTitle}</MemberTitle>
        </UserDetails>
        <TimeStamp>
          Posted On - {moment(dateTime).format("MMM Do YYYY, HH:mm")}
        </TimeStamp>
      </FeedDetailsContainer>
      <Description>{content}</Description>
      {link && (
        <Link>
          <a
            style={{ color: "#ffffff" }}
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            Relevant Link
          </a>
        </Link>
      )}
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

const Title = styled.h3`
  padding: 10px;
  text-align: left;
  align-items: left;
`;

const Description = styled.p`
  padding: 10px;
  text-align: justify;
`;

const Link = styled.p`
  padding: 10px;
  txt-align: left;
  color: white;
`;
