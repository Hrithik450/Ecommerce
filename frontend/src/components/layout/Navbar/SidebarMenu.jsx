import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    padding: "0 0 0 1rem",
    transition: {
      duration: 0.2,
      when: "beforeChildren",
    },
  },
};

const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ item, showAnimation, isOpen, setIsOpen, object }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <Wrapper>
      <Menu className="link" onClick={toggleMenu}>
        <div className="menu_item">
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

        {isOpen && (
          <motion.div
            animate={
              isMenuOpen
                ? {
                    rotate: -90,
                  }
                : { rotate: 0 }
            }
          >
            <FaAngleDown />
          </motion.div>
        )}
      </Menu>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {item.items &&
              item.items.map((it, i) => {
                if (it.items) {
                  return (
                    <SidebarMenu
                      key={`${it}-${i}`}
                      item={it}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      object={object}
                    />
                  );
                }

                return (
                  <motion.div
                    variants={menuItemAnimation}
                    key={`${it}-${i}`}
                    custom={i}
                  >
                    <NavLink to={it.href}>
                      <div className="link" $object={object}>
                        <div className="icon">{it.icon}</div>
                        <motion.div className="link_text">
                          {it.title}
                        </motion.div>
                      </div>
                    </NavLink>
                  </motion.div>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default SidebarMenu;

const Wrapper = styled.div`
  .menu_container {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  }

  .link {
    display: flex;
    color: white;
    gap: 10px;
    padding: 5px 10px;
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  .link:hover {
    background: black
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
  .active {
    background: black;
  }
`;

const Menu = styled.div`
  display: flex;
  color: white;

  padding: 5px 10px;
  border-right: 4px solid transparent;
  transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  justify-content: space-between;

  .menu_item {
    display: flex;
    gap: 10px;
  }

  .link_text {
    white-space: nowrap;
    font-size: 1rem;
  }
`;
