import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setClubInfo, setClubPostData } from "../features/clubSlice";
import { selectUser } from "../features/authSlice";
// import { selectClubInfo, selectClubPostData } from "../features/clubSlice";

import ProfileLeft from "../components/ProfileLeft";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";

function ClubProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const clubInfo = useSelector(selectClubInfo);
  // const clubPost = useSelector(selectClubPostData);
  const fetchClubInformation = useCallback(async () => {
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
          dispatch(setClubInfo(result.data));
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

  const fetchClubPostData = useCallback(async () => {
    await axios({
      method: "post",
      url: "/club/post/getPost",
      data: {
        clubName: user.clubName,
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          alert("Not able to fetch events");
          return;
        } else {
          dispatch(setClubPostData(result.data));
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
    if (user != null) {
      fetchClubInformation();
      fetchClubPostData();
    }
  }, [fetchClubInformation, fetchClubPostData, user]);
  return (
    <ClubProfileContainer>
      <ProfileLeft />
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
