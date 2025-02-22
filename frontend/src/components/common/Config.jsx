import { FaBoxOpen } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { FaBuildingUser } from "react-icons/fa6";
import { AiOutlineFieldTime } from "react-icons/ai";
import { HiMiniUsers } from "react-icons/hi2";
import { MdMarkEmailRead } from "react-icons/md";

export const object = {
  theme: "dark",
  title: "Hruthik M",
  sizing: {
    minWidth: "290px",
  },
  NavItems: [
    {
      title: "Home",
      type: "normal",
      href: "/",
      icon: <MdHome />,
      section: "left",
    },
    {
      title: "Products",
      type: "normal",
      href: "/products",
      icon: <FaBoxOpen />,
      section: "left",
    },
    {
      title: "Hoodie",
      type: "normal",
      href: "/products?Collections=hoodie",
      icon: <FaBoxOpen />,
      section: "left",
    },
    {
      title: "Round Neck",
      type: "normal",
      href: "/products?Collections=round-neck",
      icon: <FaBoxOpen />,
      section: "left",
    },
    {
      title: "Oversize",
      type: "normal",
      href: "/products?Collections=oversize",
      icon: <FaBoxOpen />,
      section: "left",
    },
    {
      title: "About Us",
      type: "normal",
      href: "/about",
      section: "left",
      icon: <FaBuildingUser />,
    },
  ],
};

export const ADMINOBJECT = {
  theme: "dark",
  title: "Admin Panel",
  sizing: {
    minWidth: "290px",
  },
  NavItems: [
    {
      title: "Products",
      type: "normal",
      href: "/admin/dashboard",
      icon: <FaBoxOpen />,
    },
    {
      title: "Orders",
      type: "normal",
      href: "/admin/orders",
      icon: <AiOutlineFieldTime />,
    },
    {
      title: "Users",
      type: "normal",
      href: "/admin/users",
      icon: <HiMiniUsers />,
    },
    {
      title: "Emails",
      type: "normal",
      href: "/admin/emails",
      icon: <MdMarkEmailRead />,
    },
  ],
};

export const filterOptions = {
  Category: [
    { id: "men", label: "men" },
    { id: "women", label: "women" },
  ],
  Collections: [
    { id: "round-neck", label: "Round Neck" },
    { id: "v-neck", label: "V Neck" },
    { id: "full-sleeve", label: "Full Sleeve" },
    { id: "half-sleeve", label: "Half Sleeve" },
    { id: "hoodie", label: "Hoodie" },
    { id: "oversize", label: "Oversize" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "ratings-hightolow", label: "Ratings: High to Low" },
  { id: "ratings-lowtohigh", label: "Ratings: Low to High" },
];

export const adminfilterOptions = {
  Status: [
    { id: "Confirmed", label: "Confirmed" },
    { id: "Dispatched", label: "Dispatched" },
    { id: "Shipped", label: "Shipped" },
    { id: "Out For Delivery", label: "Out For Delivery" },
    { id: "Delivered", label: "Delivered" },
    { id: "Cancelled", label: "Cancelled" },
  ],
  Payment: [
    { id: "Razorpay", label: "Razorpay" },
    { id: "COD", label: "COD" },
  ],
};

export const userFilterOptions = {
  Admin: [{ id: "true", label: "admin" }],
  Verified: [{ id: "true", label: "verified" }],
};

export const AlertObject = {
  position: "bottom-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
