import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import SideBar from "./SideBar";
import { FaBars } from "react-icons/fa6";
import MenuBar from "./Menubar";
import { NavLink } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { FaUserGear } from "react-icons/fa6";
import { IoCall, IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { MdLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { logout } from "../../../store/slices/auth/authThunks";
import { toggleCart } from "../../../store/slices/cart/cartSlice";
import NavIconShimmer from "../../common/shimmers/Navbar/NavbarShimmer";

const Navbar = ({ object }) => {
  const dispatch = useDispatch();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = window.location.pathname;
  const { isAuthenticated, user, authLoading } = useSelector(
    (state) => state.auth
  );
  const { cartItems, cartLoading } = useSelector((state) => state.cart);

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
  };

  const handleToggle = async () => {
    await dispatch(toggleCart());
  };

  return (
    <>
      <Wrapper>
        <NavContainer>
          <div className="left-section">
            <Logo>
              <Bars onClick={() => setIsOpen(!isOpen)} />
              <h1>ANOX</h1>
            </Logo>

            <NavItemContainer>
              {object.NavItems &&
                object.NavItems.filter((nav) => nav.section !== "right").map(
                  (nav, idx) =>
                    nav.type === "dropdown" ? (
                      <DropNavItem key={`${nav}-${idx}`}>
                        <Category>
                          <MenuBar
                            type={nav.type}
                            object={object}
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
                            object={object}
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
          </div>

          <RightSection>
            <div className="contactUs">
              <IoCall className="call-svg" />
              <div className="text-section">
                <p>CALL US NOW</p>
                <h3>+91-8167467001</h3>
              </div>
            </div>
            {cartLoading || authLoading ? (
              <NavIconShimmer />
            ) : (
              <div className="cart" onClick={handleToggle}>
                <p className="items-para">
                  {isAuthenticated ? cartItems.length || 0 : 0}
                </p>
                <FaBagShopping className="cart-svg" />
              </div>
            )}
            {authLoading ? (
              <NavIconShimmer />
            ) : (
              <div
                className="account"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
              >
                <div className="avatar">
                  {!isAuthenticated && <FaUser />}
                  {isAuthenticated && user?.image && (
                    <img
                      src="https://lh3.googleusercontent.com/a/ACg8ocKroOwYzIxP-E62qvZatqcvO0JRObejVniEoXYhdKg-q05Y7R3X=s96-c"
                      alt=""
                    />
                  )}
                  {isAuthenticated &&
                    !user?.image &&
                    user?.username &&
                    user?.username[0]}
                </div>

                {isAccountOpen && (
                  <div className="user-details">
                    {isAuthenticated && (
                      <>
                        <h4>Signed as {user?.username}</h4>
                        <a className="user-account" href="/account">
                          <FaUserGear />
                          <p>Account</p>
                        </a>
                        <a className="logout" onClick={handleLogout}>
                          <IoLogOutOutline />
                          <p>Logout</p>
                        </a>
                      </>
                    )}
                    {!isAuthenticated && (
                      <a className="login" href="/login">
                        <MdLogin />
                        <p>Login</p>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </RightSection>
        </NavContainer>
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} object={object} />
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

const DropAnimation = keyframes`
 from {
    opacity: 0;
    transform: scale(0.8);
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
  max-width: 1380px;
  margin: auto;
  padding: 2rem 4rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: transparent;
  color: white;

  .left-section {
    display: flex;
    gap: 3rem;
  }

  @media (max-width: 1280px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 3fr 1fr;
  }

  @media (max-width: 991px) {
    padding: 2.5rem 1rem;
  }

  @media (max-width: 479px) {
    padding: 1.5rem 1rem;
  }
`;

const RightSection = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  justify-items: flex-end;
  gap: 0.5rem;

  .contactUs {
    display: flex;
    align-items: center;
    gap: 1rem;
    .call-svg {
      animation: ${Animation} 1s ease-in-out;
      font-size: 1.8rem;
    }

    .text-section {
      p {
        animation: ${Animation} 1s ease-in-out;
        font-size: 0.7rem;
        padding: 2px 0;
      }

      h3 {
        animation: ${Animation} 1s ease-in-out;
        font-size: 1.3rem;
      }

      @media (max-width: 1280px) {
        p {
          font-size: 0.6rem;
        }
        h3 {
          font-size: 1.1rem;
        }
      }
    }

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .cart {
    position: relative;
    cursor: pointer;
    animation: ${Animation} 1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    .cart-svg {
      width: 30px;
      height: 30px;

      @media (max-width: 479px) {
        width: 25px;
        height: 25px;
      }
    }

    .up-svg {
      font-size: 0.8rem;
    }

    .items-para {
      position: absolute;
      top: 0%;
      transform: translateX(50%);
      background: red;
      padding: 0 5px;
      border-radius: 50%;
    }
  }

  .account {
    animation: ${Animation} 1s ease-in-out;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      color: white;
      border-radius: 50%;
      overflow: hidden;
      font-size: 1.2rem;
      border: 1px solid white;
      background-color: #2b4162;
      background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @media (max-width: 479px) {
        width: 30px;
        height: 30px;
        font-size: 1rem;
      }
    }

    .user-details {
      animation: ${DropAnimation} 1s ease-in-out;
      background-color: #2b4162;
      background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
      border: 1px solid white;
      position: absolute;
      padding: 1rem;
      top: 125%;
      right: 0%;

      .user-account {
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: max-content;
        margin: 1rem 0 0.7rem 0;
        color: white;

        &:hover {
          text-decoration: underline;
        }
      }

      .logout {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.8);
        padding-top: 0.5rem;
      }

      .login {
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: white;
      }

      h4 {
        width: max-content;
      }
    }
  }

  @media (max-width: 1200px) {
    max-width: 40%;
    margin-left: auto;
    grid-template-columns: 1fr 1fr;
    justify-items: flex-end;
    gap: 1rem;
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Standard = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
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

  .right-navcontainer {
    display: flex;
    gap: 1rem;
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
  font-size: 1.2rem;

  @media (max-width: 1280px) {
    font-size: 1rem;
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
  font-size: 1.2rem;

  &:hover {
    text-decoration: none;
  }

  @media (max-width: 1280px) {
    font-size: 1rem;
  }
`;

export default Navbar;
