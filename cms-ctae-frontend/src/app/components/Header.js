import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

// import Logo from "../assets/images/LOGO_SRIJAN.png";
import { selectUser, signOutAsync } from "../features/authSlice";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [headerColor, setHeaderColor] = useState(false);
  const [isNavOpened, setIsNavOpened] = useState(false);

  useEffect(() => {
    const headerChangeHandler = () => {
      if (window.scrollY > 300) {
        setHeaderColor(true);
      } else {
        setHeaderColor(false);
      }
    };

    window.addEventListener("scroll", headerChangeHandler);

    return () => {
      window.removeEventListener("scroll", headerChangeHandler);
    };
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsNavOpened(false);
  }, [pathname]);

  const navHandler = () => {
    setIsNavOpened((prevState) => !prevState);
  };

  // const headerClasses =
  //   pathname === "/"
  //     ? `header ${headerColor && "header__backgroundChange"}`
  //     : "header header__default";

  // const getLinkClasses = (linkPath) =>
  //   pathname === linkPath
  //     ? "header__rightLink header__rightLinkActive"
  //     : "header__rightLink";

  const signOutUser = async () => {
    try {
      await dispatch(signOutAsync());
    } catch (error) {
      alert(error);
    }
  };

  return (
    <HeaderContainer
      $isDefaultHeader={pathname !== "/"}
      $isheaderScrolled={headerColor}
      id="do__notPrint"
    >
      <Burger onClick={navHandler}>
        <MenuOpenIcon />
      </Burger>
      <HeaderRightLink to="/" $isActive={false}>
        <HeaderLeft>
          {/* <HeaderLogo src={Logo} alt="bbc" /> */}
          <HeaderTitle>CMS CTAE</HeaderTitle>
        </HeaderLeft>
      </HeaderRightLink>
      <HeaderRight $isNavOpened={isNavOpened}>
        <CloseContainer>
          <TabContainer onClick={navHandler}>&times;</TabContainer>
        </CloseContainer>
        <HeaderRightLink to="/" $isActive={pathname === "/"}>
          <TabContainer className="home">Home</TabContainer>
        </HeaderRightLink>
        {user && (
          <HeaderRightLink to="/events" $isActive={pathname === "/events"}>
            <TabContainer className="events">Events</TabContainer>
          </HeaderRightLink>
        )}
        {user && user.name ? (
          <HeaderRightLink to="/profile" $isActive={pathname === "/profile"}>
            <TabContainer className="register">
              Hey, {user.name.split(" ")[0]}
            </TabContainer>
          </HeaderRightLink>
        ) : (
          <HeaderRightLink to="/register" $isActive={pathname === "/register"}>
            <TabContainer className="register">Sign Up</TabContainer>
          </HeaderRightLink>
        )}
        {/* {user && user.name && (
          <HeaderRightLink to="/admin" $isActive={pathname === "/admin"}>
            <TabContainer>Admin</TabContainer>
          </HeaderRightLink>
        )} */}
        {user && user.name ? (
          <HeaderRightTab $isActive={false} onClick={signOutUser}>
            <TabContainer className="login">Log Out</TabContainer>
          </HeaderRightTab>
        ) : (
          <HeaderRightLink to="/login" $isActive={pathname === "/login"}>
            <TabContainer className="login">Log In</TabContainer>
          </HeaderRightLink>
        )}
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: space-around;
  align-items: center;
  letter-spacing: 2px;
  font-family: "Bebas Neue", cursive, sans-serif;
  transition: all 0.5s ease;
  z-index: 10;
  ${({ $isheaderScrolled, $isDefaultHeader }) =>
    ($isheaderScrolled || $isDefaultHeader) &&
    css`
      position: ${$isDefaultHeader ? "sticky" : "fixed"};
      background-color: var(--headerColor);
      box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.2),
        0 2px 2px 2px rgba(0, 0, 0, 0.15);
    `}

  @media only screen and (max-width: 1095px) {
    justify-content: flex-start;
  }

  @media print {
    display: none;
  }
`;

const Burger = styled.div`
  display: none;
  cursor: pointer;

  > .MuiSvgIcon-root {
    color: #fff;
    font-size: 51px;
  }

  @media only screen and (max-width: 1095px) {
    display: block;
    display: flex;
    align-self: center;
    margin: 0 15px 0 10px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

// const HeaderLogo = styled.img`
//   width: 40px;
//   height: 40px;
//   background-color: #fff;
//   object-fit: contain;
//   border-radius: 20px;
// `;

const HeaderTitle = styled.h3`
  margin-left: 20px;
  color: #fff;
  font-size: 27px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const HeaderRight = styled.nav`
  display: flex;
  width: 22%;
  justify-content: space-around;
  align-items: center;

  @media only screen and (max-width: 1095px) {
    position: absolute;
    top: 0;
    left: ${({ $isNavOpened }) => ($isNavOpened ? 0 : "-80%")};
    background-color: rgba(0, 0, 0, 0.9);
    width: 80%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    transition: all 0.5s ease-in-out;
  }
`;

const LinkStyles = css`
  text-decoration: none;
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#aaa")};
  transition: all 0.5s ease;
  padding: 5px 0 5px 0;
  border-top: ${({ $isActive }) => ($isActive ? "2px" : 0)} solid #fff;
  border-bottom: ${({ $isActive }) => ($isActive ? "2px" : 0)} solid #fff;

  :hover {
    color: #fff;
  }

  @media only screen and (max-width: 1095px) {
    margin: 20px 0;
    font-size: 23px;
  }
`;

const HeaderRightLink = styled(Link)`
  ${LinkStyles}
`;

const HeaderRightTab = styled.div`
  cursor: pointer;
  ${LinkStyles}
`;

const CloseContainer = styled(HeaderRightTab)`
  display: none;

  @media only screen and (max-width: 1095px) {
    display: block;
    position: absolute;
    top: -30px;
    left: 30px;
    font-size: 100px;
  }
`;

const TabContainer = styled.div``;
