import React, { useEffect, useCallback } from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { setEvents } from "../features/eventsSlice";

import Event from "../components/Event";
import { selectUser } from "../features/authSlice";
import { selectEvents } from "../features/eventsSlice";

import axios from "axios";

function EventsScreen() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const user = useSelector(selectUser);
  const history = useHistory();

  const fetchData = useCallback(async () => {
    await axios({
      method: "post",
      url: "/club/event/getEvents",
      data: {
        clubName: user.clubName,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Not able to fetch events");
          return;
        } else {
          dispatch(setEvents(result.data));
          return;
        }
      })
      .catch((err) => {
        if (err != null) {
          alert("Something is wrong");
          return;
        }
      });
  }, [dispatch, user.clubName]);

  useEffect(() => {
    if (user != null) fetchData();
  }, [fetchData, user]);

  return (
    <EventsContainer>
      {user?.type.toLowerCase() === "admin" && (
        <Button
          style={{
            backgroundColor: "#0000FF",
            color: "#FFFFFF",
          }}
          onClick={() => history.push("/event/create")}
        >
          Add An Event
        </Button>
      )}
      {events.map((event) => (
        <Event key={event.id} eventData={event} />
      ))}
    </EventsContainer>
  );
}

export default EventsScreen;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  background: var(--headerColor);
`;
