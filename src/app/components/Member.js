import styled from "styled-components";

import FormInput, { InputContainer, LabelField } from "../components/FormInput";
import ClubButton from "./UI/ClubButton";

function Member({ add, memberName, memberTitle, memberPicture }) {
  return (
    <MemberContainerForm>
      <FormInput
        label="Name"
        onInputChange={() => {}}
        initialValue={memberName}
        id="name"
        labelColor="#fff"
        required
      />
      <FormInput
        label="Member Title"
        onInputChange={() => {}}
        initialValue={memberTitle}
        id="memberTitle"
        labelColor="#fff"
        required
      />
      <MemberImageInput>
        <InputContainer>
          <LabelField labelColor="#fff">Upload An Image</LabelField>
          <ImageInput
            type="file"
            name="memberIcon"
            id="memberImage"
            accept="image/*"
          />
        </InputContainer>
      </MemberImageInput>
      {add ? (
        <ActionButtons>
          <ClubButton margin="0">Add</ClubButton>
        </ActionButtons>
      ) : (
        <ActionButtons>
          <ClubButton margin="0">Update</ClubButton>
          <ClubButton margin="0 0 0 10px">Delete</ClubButton>
        </ActionButtons>
      )}
    </MemberContainerForm>
  );
}

export default Member;

const MemberContainerForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
`;

const MemberImageInput = styled.div``;

const ImageInput = styled.input``;

const ActionButtons = styled.div`
  display: flex;
  width: 200px;
`;
