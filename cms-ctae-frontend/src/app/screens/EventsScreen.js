import React from "react";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Event from "../components/Event";
import { selectUser } from "../features/authSlice";
import { selectEvents } from "../features/eventsSlice";

function EventsScreen() {
  const events = useSelector(selectEvents);
  const user = useSelector(selectUser);
  const history = useHistory();

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
