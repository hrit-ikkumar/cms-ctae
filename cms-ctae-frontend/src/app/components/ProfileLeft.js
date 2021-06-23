import React from "react";
import styled, { css } from "styled-components";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";
import { Button } from "@material-ui/core";

import Logo from "../assets/images/LOGO_PC.png";

function ProfileLeft({ clubData }) {
  return (
    <ProfileLeftContainer>
      <ProfileHeaderContainer>
        <ProfileCover
          src={
            "https://www.ctae.ac.in/images/editorFiles/image/CTAE%20DEPT/CSE/Workshops_events/Github%2003.jpg"
          }
        />
        <ProfileLogoName>
          <ProfileLogo src={Logo} />
          <ProfileName>{clubData}</ProfileName>
        </ProfileLogoName>
        <ProfileLeftDescription>
        Objectives of the Programming Club:
          <br/><br/>
          &nbsp;o   Promote excellence in Computer Science and Engineering education and overall practice. 
          <br/><br/>
          &nbsp;o   Gain technical and collaborative skills to design real-life projects.
          <br/><br/>
          &nbsp;o   Learn steps of the engineering design cycle 
          (discover- evaluate, design- evaluate, develop evaluate, deliver- evaluate) 
        </ProfileLeftDescription>
        <SocialWrapper>
          <JoinButton>JOIN</JoinButton>
          <MembersButton href="#members">Members</MembersButton>
          <SocialLinksContainer>
            <SocialLink href="https://github.com" target="_blank">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://github.com" target="_blank">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://github.com" target="_blank">
              <EmailIcon />
            </SocialLink>
          </SocialLinksContainer>
        </SocialWrapper>
      </ProfileHeaderContainer>
      <ProfileGalleryContainer>
        <GalleryTitle>Our Picture Gallery</GalleryTitle>
        <GalleryGrid>
          {Array(9)
            .fill()
            .map((_, index) => (
              <GalleryPicture
                key={index}
                src={`https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`}
              />
            ))}
        </GalleryGrid>
      </ProfileGalleryContainer>
    </ProfileLeftContainer>
  );
}

export default ProfileLeft;

export const ProfileLeftContainer = styled.section`
  display: flex;
  width: 29%;
  min-width: 300px;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
  position: sticky;
  top: 0;
  left: 0;

  @media only screen and (max-width: 962px) {
    position: static;
  }

  @media only screen and (max-width: 560px) {
    width: 100%;
  }
`;

const DefaultContainerStyles = css`
  background: var(--primaryColor);
  border-radius: 10px;
`;

const ProfileHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${DefaultContainerStyles}
  padding-bottom: 20px;
`;

const ProfileCover = styled.img`
  width: 100%;
  height: 169px;
  object-fit: cover;
`;

const ProfileLogoName = styled.div`
  display: flex;
  width: 80%;
  align-items: flex-end;
  margin-top: -33px;
`;

const ProfileLogo = styled.img`
  background-color: #fff;
  border-radius: 35%;
  object-fit: contain;
  height: 90px;
  width: 90px;
`;

const ProfileName = styled.h1`
  margin: 0 0 10px 20px;
  font-family: "Antonio", sans-serif;
  font-size: 2rem;
`;

const ProfileLeftDescription = styled.p`
  padding: 20px;
  text-align: justify;
`;

const SocialWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const JoinButton = styled(Button)`
  border: 2px solid var(--buttonColor) !important;
  color: var(--buttonColor) !important;
  width: 120px;
  border-radius: 15px !important;
  transition: all 0.5s ease;

  :hover {
    background: var(--buttonColor) !important;
    color: #fff !important;
  }
`;

const MembersButton = styled(Button)`
  display: none !important;
  width: 120px;
  border-radius: 15px !important;
  background: #fd4f58 !important;
  color: #fff !important;
  margin-left: 5px !important;

  @media only screen and (max-width: 962px) {
    display: flex !important;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
`;

const SocialLink = styled.a`
  text-decoration: none;
  margin-left: 10px;

  .MuiSvgIcon-root {
    font-size: 2.8rem;
  }

  :nth-child(1) {
    color: #e1306c !important;
  }

  :nth-child(2) {
    color: #3b5998 !important;
  }

  :nth-child(3) {
    color: #ea4335 !important;
  }
`;

const ProfileGalleryContainer = styled.div`
  ${DefaultContainerStyles}
  margin: 20px 0;
  padding: 20px;
`;

const GalleryTitle = styled.h1`
  color: #fff;
`;

const GalleryGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const GalleryPicture = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  transition: all 0.4s ease;

  :hover {
    transform: scale(1.2);
  }
`;
