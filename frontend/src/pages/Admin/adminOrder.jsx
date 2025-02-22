import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { MdTune } from "react-icons/md";
import Pagination from "react-js-pagination";
import { ADMINOBJECT } from "../../components/common/Config";
import AdminOrderDetails from "../../components/admin/adminOrder/orderDetails";
import AdminCancelPanel from "../../components/admin/adminOrder/orderCancel";
import AdminTrackOrder from "../../components/admin/adminOrder/orderTrack";
import AdminSearchBar from "../../components/admin/adminProduct/adminSearchBar";
import AdminOrdersList from "../../components/admin/adminOrder/orderList";
import { fetchAllTrans } from "../../store/slices/admin/adminOrder/adminOrderThunks";
import { toggleFilterPanel } from "../../store/slices/admin/adminOrder/adminOrderSlice";
import AdminNavbar from "../../components/layout/adminNavbar/Navbar";
import AdminFilter from "../../components/admin/adminOrder/orderFilter";

const AdminOrderPage = () => {
  const { OrderPanel, CancelPanel, FilterPanel, TrackPanel } = useSelector(
    (state) => state.adminOrder
  );
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setcurrentPage] = useState(1);
  const [EntriesCount, setEntriesCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [prevSearchParams, setPrevSearchParams] = useState(
    searchParams.toString()
  );

  useEffect(() => {
    const fetchFilterProducts = async () => {
      if (prevSearchParams.toString() !== searchParams.toString()) {
        setcurrentPage(1);
      }

      const filterParams = {};
      for (const [key, value] of searchParams) {
        filterParams[key] = value.split(",");
      }

      const res = await dispatch(
        fetchAllTrans({ filterParams, page: currentPage })
      );
      if (res.type === "orders/fetch/fulfilled") {
        setEntriesCount(res.payload.totalTransactions);
      }

      setPrevSearchParams(searchParams.toString());
    };
    fetchFilterProducts();
  }, [dispatch, searchParams, currentPage]);

  const UpdateSearchparams = (newParams) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(newParams)) {
      if (value) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    }
    setSearchParams(updatedSearchParams);
  };

  const handlefilter = (filterItem, filterValue) => {
    const currentFilterValues = searchParams.getAll(filterItem) || [];
    if (currentFilterValues.includes(filterValue)) {
      const updatedValues = currentFilterValues.filter(
        (value) => value !== filterValue
      );
      UpdateSearchparams({ [filterItem]: updatedValues });
    } else {
      UpdateSearchparams({ [filterItem]: [filterValue] });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const indianDate = date && new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    UpdateSearchparams({
      date: (indianDate && indianDate.toISOString().split("T")[0]) || null,
    });
  };

  const handleSearch = (searchTerm) => {
    UpdateSearchparams({ search: searchTerm });
  };

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  // For Track Panel Purpose
  let filterParams = {};
  for (const [key, value] of searchParams) {
    filterParams[key] = value.split(",");
  }

  return (
    <Orders>
      {OrderPanel && <AdminOrderDetails />}
      {CancelPanel && (
        <AdminCancelPanel filters={filterParams} page={currentPage} />
      )}
      {TrackPanel && (
        <AdminTrackOrder filters={filterParams} page={currentPage} />
      )}
      {FilterPanel && (
        <AdminFilter
          searchParams={searchParams}
          handlefilter={handlefilter}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      )}
      <OrderContainer>
        <AdminNavbar ADMINOBJECT={ADMINOBJECT} />
        <Container>
          <h2>All Order List</h2>
          <Header>
            <div
              className="header"
              onClick={() => dispatch(toggleFilterPanel())}
            >
              <MdTune />
              <p>Filter</p>
            </div>
            <div className="sort">
              <p>
                {selectedDate
                  ? new Intl.DateTimeFormat("en-IN").format(selectedDate)
                  : "Select Date"}
              </p>
              <p>
                (
                {selectedDate
                  ? new Intl.DateTimeFormat("en-IN", {
                      weekday: "long",
                    }).format(selectedDate)
                  : "Filter via Day"}
                )
              </p>
            </div>
          </Header>
          <AdminSearchBar onSearch={handleSearch} />
          <AdminOrdersList />
          <PaginationBox>
            <p></p>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={10}
              totalItemsCount={EntriesCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="First"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </PaginationBox>
        </Container>
      </OrderContainer>
    </Orders>
  );
};

export default AdminOrderPage;

const Orders = styled.section`
  scrollbar-width: none;
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
`;

const OrderContainer = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
`;

const Container = styled.div`
  padding: 6rem 1rem 0 1rem;
  max-width: 1200px;
  margin: auto;

  h2 {
    color: white;
    font-size: 1.5rem;
    font-weight: 900;
    margin: 2rem 0 1rem 0;
  }
`;

const Header = styled.div`
  display: flex;
  margin: 1rem 0;

  h3 {
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 2px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    @media (max-width: 479px) {
      font-size: 0.9rem;
    }
  }

  .header {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex: 1;

    svg {
      color: white;
      font-size: 1.3rem;
    }

    p {
      color: white;
      font-size: 1.3rem;
      font-size: 900;

      @media (max-width: 479px) {
        font-size: 1.1rem;
      }
    }
  }

  .sort {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    color: white;

    p {
      font-weight: 900;
      font-size: 1.1rem;

      @media (max-width: 479px) {
        font-size: 0.9rem;
      }
    }
  }
`;

const PaginationBox = styled.div`
  margin: 2rem 0;

  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;
    width: 100%;
  }

  .page-item {
    display: flex;
    justify-content: center;
    background-color: #2b4162;
    background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
    list-style: none;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    transition: all 0.3s;
    cursor: pointer;
    max-width: 100%;

    @media (max-width: 479px) {
      padding: 0.5rem 0.75rem;
    }
  }

  .page-link {
    text-decoration: none;
    font-size: 1rem;
    color: white;
    transition: all 0.3s;

    @media (max-width: 991px) {
      font-size: 0.7rem;
    }
  }

  .pageItemActive {
    background: linear-gradient(90deg, #ff00ff, #ff7300);
  }

  .pageLinkActive {
    color: white;
  }

  @media (max-width: 762px) {
    grid-template-columns: 1.5fr 5fr;
  }

  @media (max-width: 579px) {
    padding: 0 2rem;
    grid-template-columns: 1fr;
    justify-items: flex-start;
  }
`;
