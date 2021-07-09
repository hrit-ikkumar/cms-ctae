import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";

import AdminSidebar from "../components/AdminSidebar";
import ClubButton from "../components/UI/ClubButton";
import { AdminContainer, AdminRightContainer } from "./AdminProfileScreen";
import { selectEvents } from "../features/eventsSlice";
import { selectUser } from "../features/authSlice";

function AdminEventsScreen() {
  const events = useSelector(selectEvents);
  const user = useSelector(selectUser);
  const history = useHistory();

  const EditEvent = (eventId) => {
    history.push(`/admin/events/edit/${eventId}`);
  };

  const DeleteEvent = useCallback(
    async (eventData) => {
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
            history.goBack();
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
    [history, user.clubName]
  );

  return (
    <AdminContainer>
      <AdminSidebar />
      <AdminRightContainer>
        <EventsContainer>
          <ClubButton
            buttonColor="var(--buttonColor)"
            margin="0"
            onButtonPress={() => history.push("/event/create")}
          >
            Create an Event
          </ClubButton>
          <EventsWrapper>
            <EventContainer>
              <EventTitle>Event Title</EventTitle>
              <ClubName>Club</ClubName>
              <EventTimeStamp>Time Stamp</EventTimeStamp>
              <ActionButtons>Actions</ActionButtons>
            </EventContainer>
            {events.map((event) => (
              <EventContainer key={event.id}>
                <EventTitle>{event.title}</EventTitle>
                <ClubName>code art</ClubName>
                <EventTimeStamp>
                  {moment(new Date(event.dateTime)).format(
                    "MMM Do YYYY, HH:mm"
                  )}
                </EventTimeStamp>
                <ActionButtons>
                  <ClubButton
                    margin="0"
                    onButtonPress={() => {
                      EditEvent(event._id);
                    }}
                  >
                    Update
                  </ClubButton>
                  <ClubButton
                    margin="0 0 0 10px"
                    onButtonPress={() => DeleteEvent(event)}
                    buttonColor="#ba0013"
                  >
                    <DeleteIcon />
                  </ClubButton>
                </ActionButtons>
              </EventContainer>
            ))}
          </EventsWrapper>
        </EventsContainer>
      </AdminRightContainer>
    </AdminContainer>
  );
}

export default AdminEventsScreen;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 94%;
  margin: 20px 3%;
`;

const EventContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  :nth-child(1) {
    font-weight: 800;
    color: #ccc;
    font-size: 1.5rem;
  }
`;

const ColumnStyles = css`
  width: 200px;
  overflow: hidden;
`;

const EventTitle = styled.h3`
  ${ColumnStyles}
`;

const ClubName = styled.h3`
  ${ColumnStyles}
`;

const EventTimeStamp = styled.h3`
  ${ColumnStyles}
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
`;
