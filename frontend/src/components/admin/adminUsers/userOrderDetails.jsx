import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  setOrderDetails,
  toggleOrder,
} from "../../../store/slices/order/orderSlice";

const UserOrderDetails = ({ orders }) => {
  const dispatch = useDispatch();

  const handleOpen = (order) => {
    dispatch(toggleOrder());
    dispatch(setOrderDetails(order));
  };

  return (
    <Container>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Details Panel</TableHeader>
            <TableHeader>Order Status</TableHeader>
            <TableHeader>Order Price</TableHeader>
            <TableHeader>Order Date</TableHeader>
            <TableHeader>Delivery Date</TableHeader>
            <TableHeader>Payable Amt</TableHeader>
            <TableHeader>Refund Apld</TableHeader>
            <TableHeader>Payment Method</TableHeader>
            <TableHeader>Payment Status</TableHeader>
          </tr>
        </TableHead>
        <TableBody>
          {orders &&
            orders.length > 0 &&
            orders.map((order, index) => (
              <TableRow key={`order-${index}`}>
                <TableCell>{order?.orderID}</TableCell>
                <TableCell>
                  <DetailsButton onClick={() => handleOpen(order)}>
                    View Details
                  </DetailsButton>
                </TableCell>
                <TableCell>
                  <StatusButton
                    className={
                      order?.orderStatus === "Confirmed"
                        ? "Yellow"
                        : order?.orderStatus === "Dispatched"
                        ? "Orange"
                        : order?.orderStatus === "Shipped"
                        ? "Blue"
                        : order?.orderStatus === "Out For Delivery"
                        ? "Purple"
                        : order?.orderStatus === "Delivered"
                        ? "Green"
                        : order?.orderStatus === "Cancelled"
                        ? "Red"
                        : "Gray"
                    }
                  >
                    {order?.orderStatus}
                  </StatusButton>
                </TableCell>
                <TableCell>{order?.orderDate}</TableCell>
                <TableCell>₹{order?.ToTalOrderAmout}</TableCell>
                <TableCell>{order?.deliveryDate}</TableCell>
                <TableCell>₹{order?.totalAmount}</TableCell>
                <TableCell>
                  ₹{Number(order?.ToTalOrderAmout) - Number(order?.totalAmount)}
                </TableCell>
                <TableCell>{order?.paymentMethod}</TableCell>
                <TableCell>
                  {" "}
                  {order?.orderStatus === "Cancelled"
                    ? order.paymentMethod === "COD"
                      ? "Not Paid"
                      : "Refunded"
                    : order?.orderStatus === "Confirmed"
                    ? order.paymentMethod === "COD"
                      ? "Pending"
                      : "Paid"
                    : order?.orderStatus === "Dispatched"
                    ? order.paymentMethod === "COD"
                      ? "Pending"
                      : "Paid"
                    : order?.orderStatus === "Shipped"
                    ? order.paymentMethod === "COD"
                      ? "Pending"
                      : "Paid"
                    : order?.orderStatus === "Out For Delivery"
                    ? order.paymentMethod === "COD"
                      ? "Pending"
                      : "Paid"
                    : order?.orderStatus === "Delivered" && "Paid"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserOrderDetails;

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

  .Yellow {
    background: #ffc107;
    color: black;
  }

  .Orange {
    background: #fd7e14;
  }

  .Blue {
    background: #007bff;
  }

  .Purple {
    background: #6f42c1;
  }

  .Green {
    background: #28a745;
  }

  .Red {
    background: #dc3545;
  }

  @media (max-width: 579px) {
    font-size: 12px;
    padding: 10px;
  }
`;

const StatusButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  text-transform: capitalize;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  @media (max-width: 579px) {
    font-size: 12px;
    padding: 5px 8px;
  }
`;

const DetailsButton = styled.button`
  padding: 8px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 579px) {
    font-size: 12px;
    padding: 5px 10px;
  }
`;
