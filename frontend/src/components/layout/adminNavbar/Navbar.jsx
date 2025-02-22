import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaBars } from "react-icons/fa6";
import MenuBar from "./Menubar";
import { NavLink } from "react-router-dom";
import SideBar from "./SideBar";

const AdminNavbar = ({ ADMINOBJECT }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = window.location.pathname;

  return (
    <>
      <Wrapper>
        <NavContainer>
          <Logo>
            <Bars onClick={() => setIsOpen(!isOpen)} />
            <h1>{ADMINOBJECT.title}</h1>
          </Logo>

          <NavItemContainer>
            {ADMINOBJECT.NavItems &&
              ADMINOBJECT.NavItems.map((nav, idx) =>
                nav.type === "button" ? (
                  <a href={nav.href} key={`${nav}-${idx}`}>
                    <Button>{nav.name}</Button>
                  </a>
                ) : nav.type === "dropdown" ? (
                  <DropNavItem key={`${nav}-${idx}`}>
                    <Category>
                      <MenuBar
                        type={nav.type}
                        ADMINOBJECT={ADMINOBJECT}
                        categories={nav.items}
                        name={nav.title}
                      />
                    </Category>
                  </DropNavItem>
                ) : nav.type === "LastDropdown" ? (
                  <DropNavItem key={`${nav}-${idx}`}>
                    <Category>
                      <MenuBar
                        type={nav.type}
                        ADMINOBJECT={ADMINOBJECT}
                        categories={nav.items}
                        name={nav.title}
                      />
                    </Category>
                  </DropNavItem>
                ) : (
                  <NavItem
                    key={`${nav}-${idx}`}
                    to={nav.href}
                    $isactive={currentPath === nav.href ? "true" : "false"}
                  >
                    {nav.title}
                  </NavItem>
                )
              )}
          </NavItemContainer>
        </NavContainer>
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ADMINOBJECT={ADMINOBJECT}
        />
      </Wrapper>
    </>
  );
};

const Animation = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Wrapper = styled.section`
  position: absolute;
  top: 0%;
  max-width: 100%;
  margin: auto;
  height: auto;
  width: 100%;
  box-sizing: border-box;
  z-index: 10;
`;

const NavContainer = styled.nav`
  max-width: 1480px;
  margin: auto;
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: 5fr 1fr;
  column-gap: 1rem;
  background-color: transparent;
  color: white;

  @media (max-width: 1024px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 991px) {
    padding: 2.5rem 1rem;
  }

  @media (max-width: 479px) {
    padding: 1rem;
  }
`;

const Standard = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  flex-basis: 20%;
`;

const Logo = styled(Standard)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 2.6rem;
  animation: ${Animation} 1s ease-in-out;

  .bars {
    width: 30px;
  }

  h1 {
    font-size: 2.3rem;
    width: max-content;

    @media (max-width: 479px) {
      font-size: 2rem;
    }
  }

  @media (max-width: 1280px) {
    flex-basis: 50%;
  }
`;

const Bars = styled(FaBars)`
  font-size: 2rem;

  @media (min-width: 991px) {
    display: none;
  }
`;

const NavItemContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (min-width: 1280px) {
    .active {
      border-bottom: 3px solid white;
    }
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const Category = styled(Standard)`
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

const DropNavItem = styled.div`
  animation: ${Animation} 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-decoration: none;
  color: black;
  cursor: pointer;
  text-align: center;
  width: max-content;
  font-size: 1.3rem;

  &:hover {
    border-bottom: 3px solid white;
  }

  @media (max-width: 1280px) {
    font-size: 1.2rem;
  }
`;

const NavItem = styled(NavLink)`
  animation: ${Animation} 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-decoration: none;
  color: white;
  cursor: pointer;
  text-align: center;
  width: max-content;
  font-size: 1.3rem;

  &:hover {
    border-bottom: 3px solid white;
    text-decoration: none;
  }

  @media (max-width: 1280px) {
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  animation: ${Animation} 1s ease-in-out;
  background-color: transparent;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0.5rem 2rem;
  border: 2px solid white;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default AdminNavbar;
