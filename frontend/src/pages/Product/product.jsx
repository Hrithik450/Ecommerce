import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { object } from "../../components/common/Config";
import { TbArrowsSort } from "react-icons/tb";
import { sortOptions } from "../../components/common/Config";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import ProductCardShimmer from "../../components/common/shimmers/product/productCardShimmer";
import Footer from "../../components/layout/Footer";
import { getFilteredProducts } from "../../store/slices/products/productThunks";
import ProductCard from "../../components/home/productCard";
import Navbar from "../../components/layout/Navbar/Navbar";
import SearchBar from "../../components/product/searchBar";
import Filter from "../../components/product/filter";

const Products = () => {
  const dispatch = useDispatch();
  const { productLoading } = useSelector((state) => state.product);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [prevSearchParams, setPrevSearchParams] = useState(
    searchParams.toString()
  );
  const { productsCount, productList } = useSelector((state) => state.product);

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

      await dispatch(
        getFilteredProducts({ filterParams, page: currentPage })
      ).unwrap();

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
      <Navbar object={object} />
      <Container>
        <Filter searchParams={searchParams} handlefilter={handlefilter} />
        <SubContainer>
          <div className="product-header">
            <h2>All Products</h2>
            <div className="filter-option">
              <h3>{productList?.length} Products</h3>
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
          <div className="search_box">
            <SearchBar onSearch={handleSearch} />
          </div>

          <Grid>
            {productLoading
              ? [...Array(8)].map((_, pidx) => (
                  <ProductCardShimmer key={`shimmer-${pidx}`} />
                ))
              : productList &&
                productList?.length > 0 &&
                productList.map((product, pidx) => (
                  <ProductCard key={pidx} product={product} />
                ))}
          </Grid>
        </SubContainer>
      </Container>

      <PaginationBox>
        <p></p>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={8}
          totalItemsCount={productsCount && productsCount}
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

export default Products;

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

    .search_box {
      max-width: 100%;
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
    gap: 0.5rem;
  }
`;

const PaginationBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin: 2rem 0;
  padding: 0 2rem;

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
    padding: 1rem 1.5rem;
    transition: all 0.3s;
    cursor: pointer;

    @media (max-width: 991px) {
      padding: 0.5rem 0.5rem;
      width: 100%;
    }

    @media (max-width: 479px) {
      padding: 0.25rem 0.5rem;
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
