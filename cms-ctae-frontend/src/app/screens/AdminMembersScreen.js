import styled from "styled-components";

import AdminSidebar from "../components/AdminSidebar";
import { AdminContainer, AdminRightContainer } from "./AdminProfileScreen";
import Member from "../components/Member";

function AdminMembersScreen() {
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
          {Array(5)
            .fill()
            .map((_, index) => (
              <Member
                key={index}
                memberName={"Hritik Kumar Sharma"}
                memberTitle="Coordinator"
                memberPicture=""
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
