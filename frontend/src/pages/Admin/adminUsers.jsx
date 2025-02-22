import React, { useEffect, useState } from "react";
import { MdTune } from "react-icons/md";
import { ADMINOBJECT } from "../../components/common/Config";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchUsersList } from "../../store/slices/admin/adminAuth/adminAuthThunks";
import UserFilter from "../../components/admin/adminUsers/userFilter";
import EditUserDetails from "../../components/admin/adminUsers/adminEdit";
import DeleteUser from "../../components/admin/adminUsers/adminDelete";
import UserMorePanel from "../../components/admin/adminUsers/adminMore";
import AdminSearchBar from "../../components/admin/adminProduct/adminSearchBar";
import UserCardShimmer from "../../components/common/shimmers/admin/userCardShimmer";
import UserCard from "../../components/admin/adminUsers/userCard";
import { toggleUserPanel } from "../../store/slices/admin/adminAuth/adminAuthSlice";
import AdminNavbar from "../../components/layout/adminNavbar/Navbar";

const AdminUsersPage = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    usersList,
    adminLoading,
    FilterPanel,
    totalUsers,
    EditPanel,
    BlockPanel,
    MorePanel,
  } = useSelector((state) => state.adminAuth);
  const [prevSearchParams, setPrevSearchParams] = useState(
    searchParams.toString()
  );
  const [User, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFilterUsers = async () => {
      if (prevSearchParams.toString() !== searchParams.toString()) {
        setcurrentPage(1);
      }

      const filterParams = {};
      for (const [key, value] of searchParams) {
        filterParams[key] = value.split(",");
      }

      await dispatch(
        fetchUsersList({ filterParams, page: currentPage })
      ).unwrap();

      setPrevSearchParams(searchParams.toString());
    };
    fetchFilterUsers();
  }, [dispatch, searchParams, currentPage]);

  const UpdateSearchparams = (newParams) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(newParams)) {
      updatedSearchParams.set(key, value);
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

  const handleSearch = (searchTerm) => {
    UpdateSearchparams({ search: searchTerm });
  };

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  const handleUser = (User) => {
    setUser(User);
  };

  return (
    <Users>
      {FilterPanel && (
        <UserFilter searchParams={searchParams} handlefilter={handlefilter} />
      )}
      {EditPanel && <EditUserDetails user={User} />}
      {BlockPanel && <DeleteUser user={User} />}
      {MorePanel && <UserMorePanel user={User} />}
      <UserContainer>
        <AdminNavbar ADMINOBJECT={ADMINOBJECT} />
        <Container>
          <h2>All Users List</h2>
          <Header>
            <div className="header" onClick={() => dispatch(toggleUserPanel())}>
              <MdTune />
              <p>Filter</p>
            </div>
          </Header>

          <AdminSearchBar onSearch={handleSearch} />

          <Grid>
            {adminLoading
              ? [...Array(6)].map((_, pidx) => (
                  <UserCardShimmer key={`shimmer-${pidx}`} />
                ))
              : usersList &&
                usersList.map((user, uidx) => (
                  <UserCard key={uidx} user={user} handleUser={handleUser} />
                ))}
          </Grid>
        </Container>
        <PaginationBox>
          <p></p>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={6}
            totalItemsCount={totalUsers}
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
      </UserContainer>
    </Users>
  );
};

export default AdminUsersPage;

const Users = styled.section`
  scrollbar-width: none;
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
`;

const UserContainer = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
`;

const Container = styled.div`
  padding: 6rem 1rem 0 1rem;
  max-width: 1200px;
  min-height: 100vh;
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
`;

const Grid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
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
