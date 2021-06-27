import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setEvents } from "../features/eventsSlice";
import { selectUser } from "../features/authSlice";

import ProfileLeft from "../components/ProfileLeft";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";

function ClubProfileScreen() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const history = useHistory();
  const { clubName } =user.clubName ;
  const fetchData = useCallback(async () => {
    await axios({
      method: "post",
      url: "/admin/club/getClubData",
      data: {
        clubName: user.clubName,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Not able to fetch events");
          return;
        } else {
          // dispatch(setClubData(result.data));
          return;
        }
      })
      .catch((err) => {
        if (err != null) {
          alert("Something is wrong");
          return;
        }
      });
  }, [user.clubName]);

  useEffect(() => {
    if (user != null) fetchData();
  }, [fetchData, user]);
  return (
    <ClubProfileContainer>
      <ProfileLeft clubData={clubName} />
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
