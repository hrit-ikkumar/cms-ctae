import styled from "styled-components";

import AdminSidebar from "../components/AdminSidebar";
import { AdminContainer, AdminRightContainer } from "./AdminProfileScreen";
import { InputContainer, LabelField } from "../components/FormInput";

import ClubButton from "../components/UI/ClubButton";

function AdminGalleryScreen() {
  return (
    <AdminContainer>
      <AdminSidebar />
      <AdminRightContainer>
        <UpdateHeadingTitle>
          Choose Images for picture Gallery
        </UpdateHeadingTitle>

        <GalleryWrapper>
          <PictureGalleryInputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 1</LabelField>
              <UpdateBanner
                type="file"
                name="Image 1"
                id="image1"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 2</LabelField>
              <UpdateBanner
                type="file"
                name="Image2"
                id="Image2"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 3</LabelField>
              <UpdateBanner
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 4</LabelField>
              <UpdateBanner
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 5</LabelField>
              <UpdateBanner
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 6</LabelField>
              <UpdateBanner
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 7</LabelField>
              <UpdateBanner
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 8</LabelField>
              <UpdateBanner
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
              />
            </InputContainer>
            <InputContainer>
              <LabelField labelColor="#fff">Image 9</LabelField>
              <UpdateBanner
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
              />
            </InputContainer>
          </PictureGalleryInputContainer>
          <GalleryGrid>
            {Array(9)
              .fill()
              .map((_, index) => (
                <GalleryPicture
                  key={index}
                  src={`https://mrmoviefilmblog.files.wordpress.com/2017/03/before-i-fall-03.jpg`}
                  loading="lazy"
                />
              ))}
          </GalleryGrid>
        </GalleryWrapper>
        <ClubButton margin="20px 30px">Update</ClubButton>
      </AdminRightContainer>
    </AdminContainer>
  );
}

export default AdminGalleryScreen;

const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PictureGalleryInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0 0 10px;
`;

const UpdateBanner = styled.input``;

const UpdateHeadingTitle = styled.h2``;

const GalleryGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px;
  width: 400px;
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
