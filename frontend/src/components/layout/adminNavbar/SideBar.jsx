import { FaXmark } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import { AnimatePresence, motion, transform } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen, ADMINOBJECT }) => {
  const { NavItems } = ADMINOBJECT;
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "80%",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <>
      {isOpen && (
        <GlobalStyles>
          <MainContainer $isOpen={isOpen}>
            <motion.div
              animate={
                isSmallScreen && {
                  width: isOpen ? "100%" : "0px",
                }
              }
              transition={
                isSmallScreen
                  ? { duration: 0.5, type: "spring", damping: 10 }
                  : undefined
              }
              className="sidebar"
            >
              <section className="routes">
                {NavItems.map((item, index) => {
                  if (item.type === "LastDropdown") {
                    return (
                      <div key={`drop-${index}`}>
                        {item.items &&
                          item.items.map((it, idx) => (
                            <NavLink key={`${it}-${idx}`} to={it.href}>
                              <div
                                className={
                                  window.location.pathname === it.href
                                    ? "link active"
                                    : "link"
                                }
                              >
                                <div className="icon">{it.icon}</div>
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      variants={showAnimation}
                                      initial="hidden"
                                      animate="show"
                                      exit="hidden"
                                      className="link_text"
                                    >
                                      {it.title}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </NavLink>
                          ))}
                      </div>
                    );
                  }

                  if (item.type === "button") {
                    return (
                      <div className="button-parent" key={`btn-${index}`}>
                        <NavLink
                          key={`${item}-${index}`}
                          to={isLoggedIn ? "/profile" : item.href}
                        >
                          {isOpen && (
                            <div
                              className="link hp-button"
                              $minWidth={ADMINOBJECT.sizing.minWidth}
                            >
                              {isLoggedIn ? (
                                <>
                                  <AuthContent>
                                    <ProfileImage
                                      src="https://res.cloudinary.com/duozomapm/image/upload/v1736068016/myEditedInage_1.12.1_cnktnz.jpg"
                                      alt="User Profile"
                                    />
                                    <AnimatePresence>
                                      {isOpen && (
                                        <motion.div
                                          variants={showAnimation}
                                          initial="hidden"
                                          animate="show"
                                          exit="hidden"
                                          className="link_text"
                                        >
                                          U25UV24000942
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </AuthContent>
                                </>
                              ) : (
                                <>
                                  <div className="icon">{item.icon}</div>
                                  <AnimatePresence>
                                    {isOpen && (
                                      <motion.div
                                        variants={showAnimation}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="link_text"
                                      >
                                        {item.name}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </>
                              )}
                            </div>
                          )}
                        </NavLink>
                      </div>
                    );
                  }

                  if (item.items && item.type === "dropdown") {
                    return (
                      <SidebarMenu
                        key={`${item}-${index}`}
                        setIsOpen={setIsOpen}
                        item={item}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        ADMINOBJECT={ADMINOBJECT}
                      />
                    );
                  }

                  return (
                    <NavLink key={`${item}-${index}`} to={item.href}>
                      <div
                        className={
                          window.location.pathname === item.href
                            ? "link active"
                            : "link"
                        }
                      >
                        <div className="icon">{item.icon}</div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={showAnimation}
                              initial="hidden"
                              animate="show"
                              exit="hidden"
                              className="link_text"
                            >
                              {item.title}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </NavLink>
                  );
                })}
              </section>
            </motion.div>
          </MainContainer>
        </GlobalStyles>
      )}
    </>
  );
};

export default SideBar;

const Animation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const GlobalStyles = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  width: 100%;
  position: absolute;
`;

const MainContainer = styled.div`
  box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease-in-out;
  display: flex;
  color: black;

  .sidebar {
    background: black;
    overflow: hidden;
    padding: 1rem;
    
    @media (min-width: 1280px){
      display: none;
    }

    @media (max-width: 479px) {
      padding: 0 1rem;
    }
  }

  .top_section {
    color: white;
    height: 10%;
    display: flex;
    gap: 0.7rem;
    align-items: center;
    padding: 2.9rem 1rem 2rem 1rem;

    h1 {
      font-size: 2.3rem;
      font-weight: bold;
      width: max-content;
    }
  }

  .logo {
    max-height: max-content;
    font-size: 18px;
    line-height: 0;
  }

  .bars {
    margin: 4px 0 0 0;
    width: 30px;
    max-height: max-content;

    svg {
      font-size: 2.5rem;
    }
  }

  .routes {
    position: relative;
    max-height: max-content;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  
  }

  a {
    text-decoration: none;
  }

  .link {
    max-height: max-content;
    display: flex;
    align-items: center;  
    font-size: 1.5rem;
    color: white;
    gap: 0.5rem;
    padding: 1.5rem;
    border-right: 4px solid transparent;
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);

      @media (max-width: 479px) {
        padding: 1rem;
        font-size: 1rem;
      }
    }
 }


  @media (max-width: 991px) {
  .active {
    background: rgba(255, 255, 255, 0.1);
   }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .link_text {
    max-height: max-content;
    white-space: nowrap;
    font-size: 1.5rem;

    @media (max-width: 479px) {
      font-size: 1rem;  
    }
  }

  .button-parent {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;

    a {
      border-radius: 40px;
    }

    .hp-button {
      padding: 0.8rem 1.5rem;
      border-radius: 40px;
      border: 1px solid gray;
      animation: ${Animation} 0.3s linear;
    }
  }
`;

const AuthContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  adminobject-fit: cover;
`;
