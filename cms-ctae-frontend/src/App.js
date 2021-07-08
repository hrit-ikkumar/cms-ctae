import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled from "styled-components";

import Header from "./app/components/Header";
import HomeScreen from "./app/screens/HomeScreen";
import EventsScreen from "./app/screens/EventsScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ViewAndEditEvent from "./app/screens/ViewAndEditEvent";
import AddEvent from "./app/screens/AddEvent";
import PrivateRoute from "./app/components/PrivateRoute";
import ProtectedRoute from "./app/components/ProtectedRoute";

import ClubProfileScreen from "./app/screens/ClubProfileScreen";
import AdminProfileScreen from "./app/screens/AdminProfileScreen";
import AdminFeedsScreen from "./app/screens/AdminFeedsScreen";
import AdminMembersScreen from "./app/screens/AdminMembersScreen";
import AdminEventsScreen from "./app/screens/AdminEventsScreen";
import AdminGalleryScreen from "./app/screens/AdminGalleryScreen";

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Switch>
          <ProtectedRoute path="/register">
            <RegisterScreen />
          </ProtectedRoute>

          <ProtectedRoute path="/login">
            <LoginScreen />
          </ProtectedRoute>

          <PrivateRoute path="/club">
            <ClubProfileScreen />
          </PrivateRoute>

          <PrivateRoute path="/events/edit/:eventId">
            <ViewAndEditEvent />
          </PrivateRoute>

          <PrivateRoute path="/event/create">
            <AddEvent />
          </PrivateRoute>

          <PrivateRoute path="/events">
            <EventsScreen />
          </PrivateRoute>

          <PrivateRoute path="/profile">
            <ProfileScreen />
          </PrivateRoute>

          <PrivateRoute path="/admin/feeds">
            <AdminFeedsScreen />
          </PrivateRoute>

          <PrivateRoute path="/admin/members">
            <AdminMembersScreen />
          </PrivateRoute>

          <PrivateRoute path="/admin/events">
            <AdminEventsScreen />
          </PrivateRoute>

          <PrivateRoute path="/admin/gallery">
            <AdminGalleryScreen />
          </PrivateRoute>

          <PrivateRoute path="/admin">
            <AdminProfileScreen />
          </PrivateRoute>

          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
`;
