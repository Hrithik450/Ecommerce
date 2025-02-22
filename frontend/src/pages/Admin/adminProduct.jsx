import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TbArrowsSort } from "react-icons/tb";
import { sortOptions } from "../../components/common/Config";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import AdminFilter from "../../components/admin/adminProduct/adminFilter";
import ProductCardShimmer from "../../components/common/shimmers/product/productCardShimmer";
import AdminProductCard from "../../components/admin/adminProduct/adminProductCard";
import Footer from "../../components/layout/Footer";
import AdminSearchBar from "../../components/admin/adminProduct/adminSearchBar";
import { toggleAdd } from "../../store/slices/admin/adminProduct/adminProductSlice";
import { getFilteredProducts } from "../../store/slices/products/productThunks";

const AdminProductPage = () => {
  const dispatch = useDispatch();
  const { productLoading } = useSelector((state) => state.product);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [productsCount, setproductsCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [prevSearchParams, setPrevSearchParams] = useState(
    searchParams.toString()
  );

  const UpdateSearchparams = (newParams) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(newParams)) {
      updatedSearchParams.set(key, value);
    }
    setSearchParams(updatedSearchParams);
  };

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
        getFilteredProducts({ filterParams, page: currentPage })
      );
      if (res.type === "filter/products/fulfilled") {
        setProducts(res.payload.products);
        setproductsCount(res.payload.totalProducts);
      }

      setPrevSearchParams(searchParams.toString());
    };
    fetchFilterProducts();
  }, [dispatch, searchParams, currentPage]);

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

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  const handleSort = (value) => {
    UpdateSearchparams({ sort: value });
  };

  const handleSearch = (searchTerm) => {
    UpdateSearchparams({ search: searchTerm });
  };

  return (
    <ProductSection>
      <Container>
        <AdminFilter searchParams={searchParams} handlefilter={handlefilter} />
        <SubContainer>
          <div className="product-header">
            <h2>All Products</h2>
            <div className="filter-option">
              <h3>{products?.length} Products</h3>
              <div
                className="sort-option"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <TbArrowsSort />
                <h3>Sort By</h3>

                {isSortOpen && (
                  <div className="sort-options">
                    {sortOptions?.map((option, oidx) => (
                      <li
                        key={`oi-${oidx}`}
                        onClick={() => handleSort(option.id)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <AdminSearchBar onSearch={handleSearch} />
          <AddPrdt className="addProduct">
            <AddBtn onClick={() => dispatch(toggleAdd())}>
              + Add New Product
            </AddBtn>
          </AddPrdt>

          <Grid>
            {productLoading
              ? [...Array(8)].map((_, pidx) => (
                  <ProductCardShimmer key={`shimmer-${pidx}`} />
                ))
              : products &&
                products.map((product, pidx) => (
                  <AdminProductCard key={pidx} product={product} />
                ))}
          </Grid>
        </SubContainer>
      </Container>

      <PaginationBox>
        <p></p>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={8}
          totalItemsCount={productsCount}
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

      <Footer header={true} />
    </ProductSection>
  );
};

export default AdminProductPage;

const Animation = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ProductSection = styled.section`
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
`;

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  margin: auto;
  max-width: 1280px;
  padding: 10rem 1rem 0 1rem;
  display: grid;
  grid-template-columns: 1fr 5fr;

  @media (max-width: 762px) {
    grid-template-columns: 1.5fr 5fr;
  }

  @media (max-width: 579px) {
    padding: 6rem 0 0 0;
    grid-template-columns: 1fr;
  }
`;

const SubContainer = styled.div`
  color: white;
  padding: 0 1rem;
  height: 100%;
  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .filter-option {
      display: flex;
      gap: 2rem;

      .sort-option {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;

        svg {
          font-size: 1.2rem;
        }

        .sort-options {
          animation: ${Animation} 0.3s ease-in-out;
          background-color: #2b4162;
          background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
          border: 1px solid white;
          position: absolute;
          padding: 1rem 1rem;
          top: 150%;
          right: 0%;
          z-index: 2;

          li {
            cursor: pointer;
            width: max-content;
            margin: 0.5rem 0 0 0;
          }
        }
      }
    }

    @media (max-width: 479px) {
      padding: 0 0.5rem;
      h2 {
        font-size: 1.1rem;
      }

      .filter-option {
        gap: 0.75rem;

        h3 {
          font-size: 0.85rem;
        }

        .sort-option {
          gap: 0.25rem;
          svg {
            font-size: 1rem;
          }
          h3 {
            font-size: 0.85rem;
          }
        }
      }
    }
  }

  @media (max-width: 479px) {
    padding: 0 0.5rem;
  }
`;

const AddPrdt = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const AddBtn = styled.button`
  cursor: pointer;
  font-size: 1.1rem;
  width: max-content;
  padding: 0.5rem 1rem;
  font-weight: 800;
  color: white;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);

  &:hover {
    background: linear-gradient(90deg, #ff00ff, #ff7300);
    border: 1px solid white;
  }

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const Grid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
`;

const PaginationBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
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
    padding: 1vmax 1.5vmax;
    transition: all 0.3s;
    cursor: pointer;

    @media (max-width: 991px) {
      width: 100%;
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
