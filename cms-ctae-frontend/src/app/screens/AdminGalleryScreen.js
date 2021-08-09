import styled from "styled-components";
import { useState, useCallback } from "react";

import AdminSidebar from "../components/AdminSidebar";
import { AdminContainer, AdminRightContainer } from "./AdminProfileScreen";
import { InputContainer, LabelField } from "../components/FormInput";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

// import { selectUser } from "../features/authSlice";
import { selectClubInfo } from "../features/clubSlice";
import axios from "axios";

import ClubButton from "../components/UI/ClubButton";

function AdminGalleryScreen() {
  // const user = useSelector(selectUser);
  const history = useHistory();

  const clubInfo = useSelector(selectClubInfo);
  const { clubPhotos } = clubInfo;

  const [image, setImage] = useState(null);

  const selectImage = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const addImageToGallery = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        let imageLinkValue = null;
        console.log(image);
        if (image) {
          let imageLinkData = new FormData();
          imageLinkData.append("file", image, image.name);
          await axios({
            method: "post",
            url: "/upload/images",
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${imageLinkData._boundary}`,
            },
            data: imageLinkData,
          })
            .then((result) => {
              if (result.status !== 200) {
                alert("Not able to fetch events");
                return;
              } else {
                imageLinkValue = result.data.filename;
                return;
              }
            })
            .catch((err) => {
              if (err != null) {
                alert("Something is wrong with uploading the image!");
                return;
              }
            });
        }
        if (imageLinkValue === null) {
          alert("Not able to upload image!");
          return;
        }
        await axios({
          method: "post",
          url: "/admin/club/addImageForGallery",
          data: { clubName: clubInfo.clubName, image: imageLinkValue },
        })
          .then((result) => {
            if (result.status !== 200) {
              alert("Not able to fetch events");
              return;
            } else {
              history.push("/club");
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
      } catch (error) {
        alert(error.message);
      }
    },
    [image, clubInfo.clubName, history]
  );

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
              <LabelField labelColor="#fff">Image</LabelField>
              <UpdateBanner
                type="file"
                name="Image"
                id="image"
                onChange={selectImage}
                accept="image/*"
              />
            </InputContainer>
            <ClubButton onButtonPress={addImageToGallery} margin="20px 30px">
              Add
            </ClubButton>
          </PictureGalleryInputContainer>

          <GalleryGrid>
            {clubPhotos.map((imageLink, index) => (
              <GalleryPicture
                key={index}
                src={`/upload/images/view/${imageLink}`}
                loading="lazy"
              />
            ))}
          </GalleryGrid>
        </GalleryWrapper>
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
