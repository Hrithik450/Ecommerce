import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const MenuBar = ({ type, object, categories, name }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [alignleft, setAlignLeft] = useState("right");

  const handlePointerMove = (e) => {
    const width = e.clientX;
    setIsHovered(true);
    if (width > window.innerWidth * 0.6) {
      setAlignLeft("left");
    }
  };

  const MenuItemRecursive = React.memo(({ category, object }) => {
    return category.items ? (
      <DropMenuItem>
        {category.title}
        {category.items && <FaCaretDown />}
        {category.items && (
          <DropdownMenu
            $minWidth={object.sizing.minWidth}
            alignleft={alignleft}
          >
            {category.items.map((SubCategory, idx) => (
              <MenuItemRecursive
                key={`${SubCategory}-${idx}`}
                category={SubCategory}
                object={object}
              ></MenuItemRecursive>
            ))}
          </DropdownMenu>
        )}
      </DropMenuItem>
    ) : (
      <MenuItem to={category.href}>
        {category.title}
        {category.items && <FaCaretDown />}
        {category.items && (
          <DropdownMenu
            $minWidth={object.sizing.minWidth}
            $alignleft={alignleft}
          >
            {category.items.map((SubCategory, idx) => (
              <MenuItemRecursive
                key={`${SubCategory}-${idx}`}
                category={SubCategory}
                object={object}
              ></MenuItemRecursive>
            ))}
          </DropdownMenu>
        )}
      </MenuItem>
    );
  });

  return (
    <Wrapper>
      <Item
        className="text-area"
        onPointerEnter={handlePointerMove}
        onPointerLeave={() => setIsHovered(false)}
      >
        {name}
        <motion.div
          animate={
            isHovered
              ? {
                  rotate: 180,
                }
              : { rotate: 0 }
          }
        >
          <DropIcon />
        </motion.div>
      </Item>
      <Menu className="dropdown-area" $type={type}>
        {categories &&
          categories.map((category, idx) => (
            <MenuItemRecursive
              key={`${category}-${idx}`}
              category={category}
              object={object}
            />
          ))}
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  max-height: 100%;
  display: flex;
  align-items: center;
  z-index: 15;

  &:hover > .dropdown-area {
    display: block;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2px;
  cursor: pointer;
  color: white;
`;

const DropIcon = styled(FaCaretUp)`
  width: 15px;
  height: 15px;
`;

const Menu = styled.div`
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  height: auto;
  width: max-content;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  border: 1px solid white;
`;

const DropdownMenu = styled.ul`
  height: auto;
  min-width: ${(props) => (props.minWidth ? props.minWidth : "200px")};
  width: max-content;
  position: absolute;
  top: 0%;
  ${(props) => (props.alignleft === "left" ? "right: 100%;" : "left: 100%;")}
  display: none;
  margin: 0;
  padding: 0;
  border: 1px solid white;
`;

const sharedStyles = `
  max-height: max-content;
  text-decoration: none;
  font-weight: normal;
  cursor: pointer;
  position: relative;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 2rem;
`;

const MenuItem = styled(NavLink)`
  ${sharedStyles}
  color: white;
  &:hover {
    text-decoration: none;
    color: white;
  }
  overflow-wrap: break-word;
  font-size: 1rem;
  &:hover > ul {
    display: block;
  }
`;

const DropMenuItem = styled.div`
  ${sharedStyles}
  color: white;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  overflow-wrap: break-word;
  font-size: 1rem;
  &:hover > ul {
    display: block;
  }

  ul {
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);

    a {
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

export default MenuBar;
