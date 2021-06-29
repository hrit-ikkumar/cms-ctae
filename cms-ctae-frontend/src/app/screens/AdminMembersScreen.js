import styled from "styled-components";

import AdminSidebar from "../components/AdminSidebar";

import { useSelector } from "react-redux";

import { selectClubInfo } from "../features/clubSlice";

import { AdminContainer, AdminRightContainer } from "./AdminProfileScreen";
import Member from "../components/Member";

function AdminMembersScreen() {
  const clubInfo = useSelector(selectClubInfo);
  return (
    <AdminContainer>
      <AdminSidebar />
      <AdminRightContainer>
        <FormContainer>
          <FormHeader>Add a New Member</FormHeader>
          <Member add />
        </FormContainer>
        <FormContainer>
          <FormHeader>Update Members</FormHeader>
          {clubInfo.clubMembers
            .map((member, index) => (
              <Member
                key={index}
                memberName={member.name}
                memberTitle={member.clubPosition}
                memberPicture={member.avatar}
              />
            ))}
        </FormContainer>
      </AdminRightContainer>
    </AdminContainer>
  );
}

export default AdminMembersScreen;

const FormContainer = styled.div`
  width: 100%;
`;

const FormHeader = styled.h2`
  margin-left: 10px;
`;
