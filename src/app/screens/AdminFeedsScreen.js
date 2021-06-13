import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

import AdminSidebar from "../components/AdminSidebar";
import { AdminContainer, AdminRightContainer } from "./AdminProfileScreen";

function AdminFeedsScreen() {
  return (
    <AdminContainer>
      <AdminSidebar />
      <AdminRightContainer>
        <FeedsContainer>
          {Array(9)
            .fill()
            .map((_, index) => (
              <FeedContainer key={index}>
                {index !== 2 && (
                  <FeedImage
                    src={
                      "https://s7280.pcdn.co/wp-content/uploads/2020/04/KnowledgeManagementGuidelinesBestPractices.png"
                    }
                    loading="lazy"
                  />
                )}
                <FeedAuthorDescription>Harshit Dabey</FeedAuthorDescription>
                <FeedDescription>
                  {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  ab in obcaecati? Id nulla magni quae nihil. Ea, nihil.
                  Doloremque harshit harami dabey nalayak hathi`.slice(
                    0,
                    index !== 2 ? 50 : 300
                  ) + "..."}
                </FeedDescription>
                <FeedFooter>
                  <FeedTimeStamp>
                    {moment(new Date()).format("MMM Do YYYY, HH:mm")}
                  </FeedTimeStamp>
                  <FeedDeleteButton aria-label="delete" title="delete">
                    <DeleteIcon />
                  </FeedDeleteButton>
                </FeedFooter>
              </FeedContainer>
            ))}
        </FeedsContainer>
      </AdminRightContainer>
    </AdminContainer>
  );
}

export default AdminFeedsScreen;

const FeedsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
  gap: 20px;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 300px;
  background: var(--headerColor);
  border-radius: 12px;
  overflow: hidden;
`;

const FeedAuthorDescription = styled.h4`
  margin: 10px 0 0 10px;
`;

const FeedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const FeedDescription = styled.p`
  margin: 10px 0 0 10px;
`;

const FeedFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px 10px 0;
`;

const FeedTimeStamp = styled.span`
  margin: 10px 0 0 10px;
`;

const FeedDeleteButton = styled(IconButton)`
  color: #fff !important ;
  transition: 0.5s ease-in-out !important;

  :hover {
    color: var(--errorColor) !important;
  }
`;
