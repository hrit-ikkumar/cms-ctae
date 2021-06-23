import styled, { css } from "styled-components";

import AdminSidebar from "../components/AdminSidebar";
import FormInput, { InputContainer, LabelField } from "../components/FormInput";
import ClubButton from "../components/UI/ClubButton";

function AdminProfileScreen() {
  return (
    <AdminContainer>
      <AdminSidebar />
      <AdminRightContainer>
        <ProfileUpdateHeading>Update Your Club</ProfileUpdateHeading>
        <ProfileUpdateForm>
          <FormWrapper>
            <FormInput
              label="Club Name"
              initialValue=""
              initiallyValid={false}
              onInputChange={() => {}}
              id="clubName"
              labelColor="#fff"
              required
            />
            <FormInput
              label="Instagram Link"
              initialValue=""
              initiallyValid={true}
              onInputChange={() => {}}
              id="instagramLink"
              labelColor="#fff"
            />
            <FormInput
              label="Facebook Link"
              initialValue=""
              initiallyValid={true}
              onInputChange={() => {}}
              id="facebookLink"
              labelColor="#fff"
            />
            <FormInput
              label="Gmail Link"
              initialValue=""
              initiallyValid={true}
              onInputChange={() => {}}
              id="gmailLink"
              labelColor="#fff"
            />
            <DescriptionInputContainer>
              <LabelField labelColor="#fff">DESCRIPTION</LabelField>
              <ProfileDescription
                name="Update Description"
                id="updateDescription"
                cols="30"
                rows="10"
              />
            </DescriptionInputContainer>

            <ImagesInputContainer>
              <InputContainer>
                <LabelField labelColor="#fff">Choose Banner</LabelField>
                <UpdateBanner
                  type="file"
                  name="Banner"
                  id="banner"
                  accept="image/*"
                />
              </InputContainer>
              <InputContainer>
                <LabelField labelColor="#fff">Choose Logo</LabelField>
                <UpdateBanner
                  type="file"
                  name="logo"
                  id="logo"
                  accept="image/*"
                />
              </InputContainer>
            </ImagesInputContainer>
          </FormWrapper>
          <ClubButton onButtonPress={() => {}}>Update</ClubButton>
        </ProfileUpdateForm>
      </AdminRightContainer>
    </AdminContainer>
  );
}

export default AdminProfileScreen;

export const AdminContainer = styled.main`
  display: flex;
  background: var(--headerColor);
  min-height: calc(100vh - 60px);
  padding: 10px;
  color: #fff;
`;

export const AdminRightContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0.8;
  width: 100%;
  height: calc(100vh - 80px);
  background: var(--primaryColor);
  margin-left: 10px;
  padding: 20px;
  border-radius: 20px;
  overflow-y: auto;
`;

const ProfileUpdateHeading = styled.h2`
  color: "#fff";
  margin-bottom: 23px;
`;

const ProfileUpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
`;

const StyledInput = css`
  min-width: 250px;
  padding: 5px;
  border: none;
  outline-width: 0;
  border-bottom: 2px solid #033649;
  background: transparent;
  padding-right: 30px;
  resize: none;
  color: #fff;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

const ProfileDescription = styled.textarea`
  ${StyledInput}
  width: 94%;
`;

const DescriptionInputContainer = styled(InputContainer)`
  width: 100%;
`;

const ImagesInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #033649;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0 0 10px;
`;

const UpdateBanner = styled.input``;
