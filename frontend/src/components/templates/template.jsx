import React from "react";
import styled from "styled-components";

const Template = () => {
  const orders = [
    { id: 1, product: "Hoodie", quantity: 2, price: "$40" },
    { id: 2, product: "Oversized T-Shirt", quantity: 1, price: "$25" },
    { id: 3, product: "Joggers", quantity: 3, price: "$60" },
  ];

  return (
    <Container>
      <Header>
        <img
          src="https://res.cloudinary.com/duozomapm/image/upload/v1737799706/AnuvBanner2_lp8bqd.jpg"
          alt="ANOX"
        />
      </Header>

      <Body>
        <h2>Order Confirmed Successfully</h2>
        <p className="desc">
          Thank you for shopping with Anox Clothing Brand! Your order has been
          successfully placed. Below are your order details:
        </p>

        <h3>Order Details</h3>
        <ul>
          <li>
            <strong>Order Number:</strong>
          </li>
          <li>
            <strong>Order Date:</strong>
          </li>
          <li>
            <strong>Total Amount: </strong>
          </li>
          <li>
            <strong>Payment Method:</strong>
          </li>
        </ul>

        <h3>Shipping Information</h3>
        <ul>
          <li>
            <strong>Shipping Address:</strong>
          </li>
          <li>
            <strong>Shipping Method:</strong>
          </li>
          <li>
            <strong>Estimated Delivery Date: </strong>
          </li>
        </ul>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th style={tableHeaderStyle}>Order ID</th>
              <th style={tableHeaderStyle}>Product</th>
              <th style={tableHeaderStyle}>Quantity</th>
              <th style={tableHeaderStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{order.id}</td>
                <td style={tableCellStyle}>{order.product}</td>
                <td style={tableCellStyle}>{order.quantity}</td>
                <td style={tableCellStyle}>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button>Track Your Order!</Button>

        <p>Thank you for choosing Anox Clothing Brand!</p>
        <p>Best Regards,</p>
        <p>Team ANOX</p>
        <p>
          Need help?
          <Link href="https://hruthik.onrender.com/contact">
            Contact us here.
          </Link>
        </p>
      </Body>

      <Footer>
        © 2025-2026 All rights reserved | Designed and Developed by Hruthik M
      </Footer>
    </Container>
  );
};

export default Template;

const Container = styled.div`
  max-width: 550px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Header = styled.div`
  text-align: center;
  color: white;

  h1 {
    margin: 0;
    font-size: 24px;
  }

  img {
    border: 1px solid white;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Body = styled.div`
  padding: 1rem;
  text-align: left;

  .desc {
    margin: 1rem 0;
    font-size: 1.1rem;
  }

  .note {
    color: red;
  }

  h3 {
    margin: 1rem 0;
  }

  p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }

  img {
    border: 1px solid white;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  ul {
    li {
      margin: 0.5rem 0;
      list-style: none;

      strong {
        color: rgba(0, 0, 0, 0.6);
        font-weight: 900;
      }
    }
  }

  @media (max-width: 479px) {
    padding: 1rem 0;
  }
`;

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};

const tableRowStyle = {
  backgroundColor: "#fff",
};

const Button = styled.a`
  display: inline-block;
  margin: 1rem 0 10px 0;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #0088ff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background-color: #0077dd;
  }
`;

const Footer = styled.div`
  padding: 10px;
  font-size: 0.9rem;
  text-align: left;
  color: #555;
`;

const Link = styled.a`
  color: #0073e6;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
