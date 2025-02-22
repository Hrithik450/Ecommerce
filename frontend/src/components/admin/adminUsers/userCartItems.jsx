import React from "react";
import styled from "styled-components";

const UserCartItems = ({ Items }) => {
  return (
    <Container>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Product ID</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Product Qty</TableHeader>
            <TableHeader>Product Color</TableHeader>
            <TableHeader>Product Size</TableHeader>
            <TableHeader>Sale Price</TableHeader>
            <TableHeader>Rating</TableHeader>
            <TableHeader>Reviews</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {Items &&
            Items.length > 0 &&
            Items.map((item, index) => (
              <TableRow key={`item-${index}`}>
                <TableCell>{item?.productID}</TableCell>
                <TableCell>{item?.productName}</TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>{item?.color}</TableCell>
                <TableCell>{item?.size}</TableCell>
                <TableCell>₹{item?.salePrice}</TableCell>
                <TableCell>{item?.rating}</TableCell>
                <TableCell>{item?.reviews}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserCartItems;

const Container = styled.div`
  background-color: transparent;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  white-space: nowrap;

  @media (max-width: 579px) {
    display: block;
    overflow-x: auto;
  }
`;

const TableHead = styled.thead`
  background-color: transparent;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-size: 16px;
  color: white;
  border-bottom: 1px solid #ddd;

  @media (max-width: 579px) {
    font-size: 14px;
    padding: 10px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: transparent;
  }

  &:hover {
    background-color: transparent;
  }

  @media (max-width: 579px) {
    display: table-row;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  font-size: 14px;
  color: white;
  border-bottom: 1px solid #ddd;

  .cancel {
    background: #dc3545;
    &:hover {
      background-color: red;
    }
  }

  .red {
    background: #dc3545;
  }

  .green {
    background: green;
  }

  .yellow {
    background: yellow;
    color: black;
  }

  @media (max-width: 579px) {
    font-size: 12px;
    padding: 10px;
  }
`;
