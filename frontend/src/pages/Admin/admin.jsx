import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ADMINOBJECT } from "../../components/common/Config";
import AdminAddDetails from "../../components/admin/adminProduct/adminAdd";
import AdminEditDetails from "../../components/admin/adminProduct/adminEdit";
import AdminDeleteDetails from "../../components/admin/adminProduct/adminDelete";
import AdminProductPage from "./adminProduct";
import AdminNavbar from "../../components/layout/adminNavbar/Navbar";

const AdminPanel = () => {
  const { addProduct, editProduct, deleteProduct } = useSelector(
    (state) => state.adminProduct
  );

  return (
    <Dashboard>
      {addProduct && <AdminAddDetails />}
      {editProduct && <AdminEditDetails />}
      {deleteProduct && <AdminDeleteDetails />}
      <ProductContainer>
        <AdminNavbar ADMINOBJECT={ADMINOBJECT} />
        <AdminProductPage />
      </ProductContainer>
    </Dashboard>
  );
};

export default AdminPanel;

const Dashboard = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
`;

const ProductContainer = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
`;
