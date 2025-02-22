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

const SidebarMenu = ({
  item,
  showAnimation,
  isOpen,
  setIsOpen,
  ADMINOBJECT,
}) => {
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
                      ADMINOBJECT={ADMINOBJECT}
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
                      <div className="link" $ADMINOBJECT={ADMINOBJECT}>
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
    background-color: rgba(255, 253, 208, 0.5);
  }

  .link {
    display: flex;
    color: black;
    gap: 10px;
    padding: 5px 10px;
    border-right: 4px solid transparent;
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }

  .link:hover {
    border-right: 4px solid white;
    background: rgb(238, 238, 238);
    transition: 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
  .active {
    border-right: 4px solid white;
    background: rgb(238, 238, 238);
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
    font-size: 15px;
  }
`;
