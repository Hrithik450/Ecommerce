import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DotSpinner from "../../common/dotSpinner";
import {
  setAdminOrders,
  toggleCancelPanel,
  toggleOrderPanel,
  toggleTrackPanel,
} from "../../../store/slices/admin/adminOrder/adminOrderSlice";

const AdminOrdersList = () => {
  const { AdminOrderLists, adminOrderLoading } = useSelector(
    (state) => state.adminOrder
  );

  const dispatch = useDispatch();

  const handleOpen = (order) => {
    dispatch(setAdminOrders(order));
    dispatch(toggleOrderPanel());
  };

  const handleCancel = (order) => {
    dispatch(setAdminOrders(order));
    dispatch(toggleCancelPanel());
  };

  const handleAdminTrack = (order) => {
    dispatch(setAdminOrders(order));
    dispatch(toggleTrackPanel());
  };

  return (
    <Container>
      {adminOrderLoading ? (
        <DotSpinner />
      ) : (
        <Table>
          <TableHead>
            <tr>
              <TableHeader>User ID</TableHeader>
              <TableHeader>Username</TableHeader>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Track Order</TableHeader>
              <TableHeader>Details Panel</TableHeader>
              <TableHeader>Order Status</TableHeader>
              <TableHeader>Order Price</TableHeader>
              <TableHeader>Order Date</TableHeader>
              <TableHeader>Delivery Date</TableHeader>
              <TableHeader></TableHeader>
            </tr>
          </TableHead>
          <TableBody>
            {AdminOrderLists &&
              AdminOrderLists.length > 0 &&
              AdminOrderLists.map((order, index) => (
                <TableRow key={`order-${index}`}>
                  <TableCell>{order?.userID}</TableCell>
                  <TableCell>{order?.username}</TableCell>
                  <TableCell>{order?.orderID}</TableCell>
                  <TableCell>
                    <DetailsButton
                      className="track"
                      onClick={() => handleAdminTrack(order)}
                    >
                      Track Order
                    </DetailsButton>
                  </TableCell>
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
                  <TableCell>{order?.ToTalOrderAmout}</TableCell>
                  <TableCell>{order?.orderDate}</TableCell>
                  <TableCell>{order?.deliveryDate}</TableCell>
                  <TableCell>
                    {order?.orderStatus !== "Delivered" &&
                      order?.orderStatus !== "Cancelled" && (
                        <DetailsButton
                          className="cancel"
                          onClick={() => handleCancel(order)}
                        >
                          Cancel Order
                        </DetailsButton>
                      )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default AdminOrdersList;

const Container = styled.div`
  background-color: transparent;
`;

const Table = styled.table`
  width: 100%;
  scrollbar-width: none;
  border-collapse: collapse;
  background-color: transparent;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: block;
  overflow-x: auto;
  white-space: nowrap;
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

  .track {
    background: linear-gradient(90deg, #ff00ff, #ff7300);
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
