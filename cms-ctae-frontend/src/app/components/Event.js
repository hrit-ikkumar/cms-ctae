import React, { useState, useCallback } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

import { selectUser } from "../features/authSlice";

function Event({ eventData }) {
  const user = useSelector(selectUser);
  const history = useHistory();

  const [participants] = useState(eventData.participants);

  const enrollInEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      await axios({
        method: "post",
        url: "/club/event/participate",
        data: {
          userDetails: {
            email: user.email,
            name: user.name,
            course: user.course,
            clubPosition: user.clubPosition,
            year: user.year,
            whatsAppPhone: user.whatsAppPhone,
          },
          clubName: user.clubName,
          title: eventData.title,
          _id: eventData._id
        },
      })
        .then((result) => {
          if (result.status !== 200) {
            alert("Not able to delete event");
            return;
          } else {
            history.replace("/"); // move to the main page
            history.push("/events"); // move back to the events to re fetch events.
            return;
          }
        })
        .catch((err) => {
          if (err != null) {
            alert("Something is wrong");
            return;
          }
        });
    },
    [eventData._id, eventData.title, history, user.clubName, user.clubPosition, user.course, user.email, user.name, user.whatsAppPhone, user.year]
  );

  const editEvent = () => {
    history.push(`/events/edit/${eventData._id}`);
  };

  const deleteEvent = useCallback(async () => {
    await axios({
      method: "delete",
      url: "/club/event/delete",
      data: {
        ...eventData,
        clubName: user.clubName,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Not able to delete event");
          return;
        } else {
          history.replace("/"); // move to the main page
          history.push("/events"); // move back to the events to re fetch events.
          return;
        }
      })
      .catch((err) => {
        if (err != null) {
          alert("Something is wrong");
          return;
        }
      });
  }, [eventData, history, user.clubName]);

  return (
    <EventContainer poster={eventData.poster}>
      <EventPoster>
        <img src={eventData.poster} alt="poster" loading="lazy" />
      </EventPoster>
      <EventDetails>
        <h2>{eventData.title}</h2>
        <p>{eventData.description}</p>
        <span>
          Date and time -{" "}
          {moment(new Date(eventData.dateTime)).format("MMM Do YYYY, HH:mm")}
        </span>
        <a href={eventData.meetUrl} target="_blank" rel="noreferrer">
          Meeting URL
        </a>
        {user?.type.toLowerCase() === "admin" && (
          <ButtonContainer>
            <HeroButton onClick={editEvent}>Edit</HeroButton>
            <HeroButton onClick={deleteEvent}>Delete</HeroButton>
          </ButtonContainer>
        )}
        <RegisterButton
          disabled={
            user
              ? new Date(eventData.dateTime) > new Date()
                ? participants.some((participant) => participant.email === user.email)
                  ? true
                  : false
                : true
              : true
          }
          onClick={enrollInEventHandler}
        >
          {user
            ? new Date(eventData.dateTime) > new Date()
              ? participants.some((participant) => participant.email === user.email)
                ? "You have registered"
                : "Register Now"
              : "Registrations are over"
            : "Sign In to register"}
        </RegisterButton>
      </EventDetails>
    </EventContainer>
  );
}

export default Event;

const EventContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: calc(100% - 60px);
  margin: 30px;
  box-shadow: 2px 4px 8px 0 rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 60px 20px;
  overflow: hidden;
  background-blend-mode: darken;
  color: #fff;
  background: rgba(0, 0, 0, 0.7) url(${({ poster }) => poster}) center/cover
    fixed no-repeat;

  @media only screen and (max-width: 450px) {
    flex-direction: column;
    padding: 60px 2px;
    margin: 10px 5px;
    width: calc(100% - 10px);
  }

  @media only screen and (min-width: 450px) and (max-width: 1070px) {
    flex-direction: column;
  }
`;

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 572px;
`;

const EventPoster = styled(EventWrapper)`
  justify-content: center;
  align-items: center;

  > img {
    width: 70%;
    max-width: 401px;
    height: 560px;
    object-fit: cover;
    border-radius: 20px;
    transition: transform 0.3s ease;
  }

  > img:hover {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 450px) {
    width: 100%;

    > img {
      width: 100%;
    }
  }

  @media only screen and (min-width: 450px) and (max-width: 1070px) {
    width: 100%;

    > img {
      width: 90%;
    }
  }
`;

const EventDetails = styled(EventWrapper)`
  > h2 {
    font-size: 30px;
  }

  > span {
    color: #ccc;
    font-weight: bold;
  }

  > a {
    width: fit-content;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
  }

  > p,
  > span,
  > a {
    padding: 10px;
  }

  @media only screen and (max-width: 450px) {
    margin-top: 30px;
    width: 100%;
  }

  @media only screen and (min-width: 450px) and (max-width: 1070px) {
    margin-top: 30px;
    width: 90%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const HeroButton = styled(Button)`
  padding: 8px 20px !important;
  border: 2px solid #fff !important;
  color: #fff !important;
  transition: all 0.5s ease-in-out !important;

  :hover {
    color: #000 !important;
    background: #fff !important;
  }
`;

const RegisterButton = styled(HeroButton)`
  margin: 10px !important;
  padding: 0;
`;
