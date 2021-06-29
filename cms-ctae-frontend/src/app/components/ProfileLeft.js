import React from "react";
import styled, { css } from "styled-components";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

import EmailIcon from "@material-ui/icons/Email";
// import { Button } from "@material-ui/core";
import { selectClubInfo } from "../features/clubSlice";

import { useSelector } from "react-redux";

function ProfileLeft() {
  const clubInfo = useSelector(selectClubInfo);

  return (
    <ProfileLeftContainer>
      <ProfileHeaderContainer>
        <ProfileCover src={clubInfo && clubInfo.clubBanner} />
        <ProfileLogoName>
          <ProfileLogo src={clubInfo && clubInfo.clubLogo} />
          <ProfileName>{clubInfo && clubInfo.clubName}</ProfileName>
        </ProfileLogoName>
        <ProfileLeftDescription>
          <h3>Objectives of Club: </h3>
          {/* club objectives section */}
          <ol>
            {clubInfo &&
              clubInfo.clubObjectives &&
              clubInfo.clubObjectives.map((text) => <li>{text}</li>)}
          </ol>
        </ProfileLeftDescription>
        <SocialWrapper>
          {/* <JoinButton>JOIN</JoinButton>
          <MembersButton href="#members">Members</MembersButton> */}
          <SocialLinksContainer>
            {clubInfo && clubInfo.socialMedia && clubInfo.socialMedia.linkedin && (
              <SocialLink href={clubInfo.socialMedia.linkedin} target="_blank">
                <LinkedInIcon />
              </SocialLink>
            )}
            {clubInfo && clubInfo.socialMedia && clubInfo.socialMedia.email && (
              <SocialLink href={clubInfo.socialMedia.email} target="_blank">
                <EmailIcon />
              </SocialLink>
            )}
            {clubInfo &&
              clubInfo.socialMedia &&
              clubInfo.socialMedia.instagram && (
                <SocialLink
                  href={clubInfo.socialMedia.instagram}
                  target="_blank"
                >
                  <InstagramIcon />
                </SocialLink>
              )}
            {clubInfo && clubInfo.socialMedia && clubInfo.socialMedia.facebook && (
              <SocialLink href={clubInfo.socialMedia.facebook} target="_blank">
                <FacebookIcon />
              </SocialLink>
            )}
          </SocialLinksContainer>
        </SocialWrapper>
      </ProfileHeaderContainer>
      <ProfileGalleryContainer>
        <GalleryTitle>Our Picture Gallery</GalleryTitle>
        <GalleryGrid>
          {clubInfo &&
            clubInfo.clubPhotos &&
            clubInfo.clubPhotos.map((_, index) => (
              <GalleryPicture key={index} src={clubInfo.clubPhotos[index]} />
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
  margin: 0 0 0px 20px;
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
