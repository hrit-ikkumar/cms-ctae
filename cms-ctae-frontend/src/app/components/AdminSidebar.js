import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EventIcon from "@material-ui/icons/Event";
import MembersIcon from "@material-ui/icons/PermContactCalendar";
import FeedsIcon from "@material-ui/icons/PostAdd";
import GalleryIcon from "@material-ui/icons/PhotoLibraryOutlined";

import { selectClubInfo } from "../features/clubSlice";

function AdminSidebar() {
  const { pathname } = useLocation();
  const clubInfo = useSelector(selectClubInfo);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <ClubIcon loading="lazy" src={clubInfo.clubLogo} />
        <HeaderTitle>{clubInfo.clubName}</HeaderTitle>
      </SidebarHeader>
      <SidebarNavigation>
        <SidebarTab to="/admin" $isActive={pathname === "/admin"}>
          <AccountCircleIcon />
          <TabTitle>Profile</TabTitle>
        </SidebarTab>
        <SidebarTab
          to="/admin/gallery"
          $isActive={pathname === "/admin/gallery"}
        >
          <GalleryIcon />
          <TabTitle>Gallery</TabTitle>
        </SidebarTab>
        <SidebarTab to="/admin/events" $isActive={pathname === "/admin/events"}>
          <EventIcon />
          <TabTitle>Events</TabTitle>
        </SidebarTab>
        <SidebarTab
          to="/admin/members"
          $isActive={pathname === "/admin/members"}
        >
          <MembersIcon />
          <TabTitle>Members</TabTitle>
        </SidebarTab>
        <SidebarTab to="/admin/feeds" $isActive={pathname === "/admin/feeds"}>
          <FeedsIcon />
          <TabTitle>Feeds</TabTitle>
        </SidebarTab>
      </SidebarNavigation>
    </SidebarContainer>
  );
}

export default AdminSidebar;

const SidebarContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 0.2;
  background: var(--primaryColor);
  color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 350px;
  height: calc(100vh - 80px);
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #333;
  padding: 10px 0;
`;

const ClubIcon = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 35%;
  background: #fff;
  object-fit: contain;
`;

const HeaderTitle = styled.h2`
  display: flex;
  align-self: flex-end;
  margin: 0 0 10px 10px;
`;

const SidebarNavigation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const SidebarTab = styled(Link)`
  display: flex;
  font-size: 1.5rem;
  color: #fff;
  font-family: "Antonio", sans-serif;
  text-decoration: none;
  padding: 15px;
  border-radius: 10px;
  margin: 3px 0;
  background: ${({ $isActive }) =>
    $isActive ? "rgba(255, 255, 255, 0.1)" : "transparent"};

  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TabTitle = styled.h4`
  margin-left: 20px;
`;
