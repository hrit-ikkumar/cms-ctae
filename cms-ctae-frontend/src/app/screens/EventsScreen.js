import React, { useEffect, useCallback, useState } from "react";
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
  const [eventData, setEventData] = useState([]);
  const user = useSelector(selectUser);
  const history = useHistory();

  const fetchData = useCallback(
    async () => {
      await axios({
        method: "get",
        url: "/club/event",
        data: {
          clubName: user.clubName,
        },
      })
        .then((result) => {
          console.log("resul aayaa");
          if (result.status != 200) {
            alert("Not able to fetch events");
          } else {
            console.log(result.data);
            dispatch(setEvents(result.data));
            setEventData(result.data);
            return;
          }
        })
        .catch((err) => {
          console.log("err de diya");
          if (err != null) {
            alert("Something is wrong");
            return;
          }
        });
    } 
  );
  useEffect(() => {
    console.log("HOOK IS CALLED");
    console.log(user);
    console.log(user.clubName);
    if (user != null && user.clubName != null) {
      console.log("start");
      fetchData();
      console.log("end");
    }
  }, [fetchData, user]);

  if (eventData != null) {
    console.log(eventData);
    dispatch(setEvents(eventData));
  }

  return (
    <EventsContainer>
      {user?.type.toLowerCase() === "admin" && (
        <Button onClick={() => history.push("/event/create")}>
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
