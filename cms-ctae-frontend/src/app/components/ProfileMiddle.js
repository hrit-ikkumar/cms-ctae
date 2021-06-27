import React from "react";
import styled, { css } from "styled-components";
import { IconButton } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhance";
import Feed from "./Feed";
import { useSelector } from "react-redux";

import { selectClubInfo, selectClubPostData } from "../features/clubSlice";

function ProfileMiddle() {
  const clubInfo = useSelector(selectClubInfo);
  const clubPost = useSelector(selectClubPostData);
  console.log("ClubPOST DATA: " + clubPost);
  return (
    <ProfileMiddleContainer>
      <CreatePostContainer>
        <ProfileInput placeholder="Add something..." />
        <ActionButtonsContainer>
          <UploadIcon htmlFor="fileInput">
            <CameraEnhanceIcon />
          </UploadIcon>
          <ImageInput
            type="file"
            name="image"
            id="fileInput"
            accept="image/*"
          />
          <PostButton>
            <TelegramIcon />
          </PostButton>
        </ActionButtonsContainer>
      </CreatePostContainer>
      {clubPost &&
        clubPost.map((_, index) => (
          <Feed key={index} feedData={clubPost[index]} />
        ))}
    </ProfileMiddleContainer>
  );
}

export default ProfileMiddle;

export const ProfileMiddleContainer = styled.section`
  display: flex;
  width: 40%;
  min-width: 400px;
  flex-direction: column;

  @media only screen and (max-width: 560px) {
    width: 100%;
    min-width: 100%;
  }
`;

const DefaultContainerStyles = css`
  background: var(--primaryColor);
  border-radius: 10px;
`;

const CreatePostContainer = styled.div`
  ${DefaultContainerStyles}
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const ProfileInput = styled.textarea`
  width: 100%;
  height: 150px;
  background-color: transparent;
  outline-width: 0;
  border: none;
  resize: none;
  padding: 20px;
  color: #fff;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  margin: 10px 15px;
  justify-content: space-between;
  align-items: center;
`;

const UploadIcon = styled.label`
  cursor: pointer;

  .MuiSvgIcon-root {
    font-size: 2.5rem;
    color: #fff;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const PostButton = styled(IconButton)`
  display: flex;
  background-color: var(--secondaryButtonColor) !important;
  width: 70px !important;
  height: 35px !important;
  border-radius: 8px !important;

  .MuiSvgIcon-root {
    font-size: 2rem;
    color: #fff;
  }
`;
