import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AlertObject, object } from "../../components/common/Config";
import ReactStars from "react-rating-stars-component";
import { ImLoop2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../store/slices/cart/cartThunks";
import { toggleCart } from "../../store/slices/cart/cartSlice";
import DotSpinner from "../../components/common/dotSpinner";
import {
  fetchCartProduct,
  getProductById,
} from "../../store/slices/products/productThunks";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar/Navbar";
import DetailShimmer from "../../components/common/shimmers/product/productDetailShimmer";
import SimilarProducts from "../../components/product/similarProducts";
import ParallaxSwiper from "../../components/common/Swiper";
import ReviewForm from "../../components/product/reviewForm";

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productID } = useParams();
  const [cartLoading, setcartLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { productDetails, cartProduct, productLoading } = useSelector(
    (state) => state.product
  );
  const [formData, setformData] = useState({
    color: null,
    size: null,
  });

  useEffect(() => {
    const fetchProductDetail = async () => {
      await dispatch(getProductById({ productID })).unwrap();
    };
    fetchProductDetail();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    if (!productDetails) return;

    const fetchUserData = async () => {
      await dispatch(
        fetchCartProduct({
          userID: user?.userID,
          productID: productDetails?.productID,
        })
      ).unwrap();
    };

    fetchUserData();
  }, [dispatch, user]);

  useEffect(() => {
    if (cartProduct) {
      setformData({
        color: cartProduct.color || null,
        size: cartProduct.size || null,
      });
    }
  }, [cartProduct]);

  const handleChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const updateCart = async () => {
    if (!formData.color || !formData.size) {
      return toast.error("Please select a asize ad color", AlertObject);
    }

    if (!isAuthenticated) {
      navigate("/login");
    }

    if (!user) return;

    try {
      setcartLoading(true);
      await dispatch(
        addToCart({
          userID: user?.userID,
          productID: productDetails?.productID,
          cartData: {
            color: formData.color,
            size: formData.size,
            quantity: 1,
          },
        })
      ).unwrap();
    } finally {
      setcartLoading(false);
    }
  };

  const calculateDiscountPercentage = (salePrice, price) => {
    if (salePrice >= price) {
      return 0;
    }
    const discountAmount = price - salePrice;
    const discountPercentage = (discountAmount / price) * 100;
    return discountPercentage.toFixed(2);
  };

  let isInCart;
  if (productDetails) {
    isInCart = cartItems.some(
      (item) => item.productID === productDetails.productID
    );
  }

  const Stock = productDetails?.stock;

  return (
    <ProductSection>
      <Navbar object={object} />
      <div className="container">
        <Container>
          {productLoading ? (
            <DetailShimmer />
          ) : (
            <ImageSection>
              <img src={productDetails?.image} alt="" />
            </ImageSection>
          )}

          <InfoSection>
            <Title>{productDetails?.title}</Title>
            <Description>{productDetails?.description}</Description>
            <Price>
              <CurrentPrice>₹{productDetails?.salePrice}</CurrentPrice>
              <OriginalPrice>₹{productDetails?.price}</OriginalPrice>
              {productDetails?.price && productDetails?.salePrice && (
                <Discount>
                  {calculateDiscountPercentage(
                    Number(productDetails?.salePrice),
                    Number(productDetails?.price)
                  )}
                  % OFF
                </Discount>
              )}
            </Price>
            <Reviews>
              {productDetails?.rating !== undefined && (
                <ReactStars
                  count={5}
                  value={productDetails?.rating}
                  size={window.innerWidth < 479 ? 20 : 28}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                  edit={false}
                />
              )}
              <p>({productDetails?.reviews} reviews)</p>
            </Reviews>

            <Options>
              <Label>Color</Label>
              <ColorOptions>
                {productDetails?.colors.length > 0 &&
                  productDetails?.colors.map((color, cidx) => (
                    <ColorCircle
                      color={color}
                      key={`color-${cidx}`}
                      onClick={() => handleChange("color", color)}
                      className={formData?.color === color ? "activeColor" : ""}
                    />
                  ))}
              </ColorOptions>

              <Label>Size</Label>
              <Select
                value={formData?.size || ""}
                onChange={(e) => handleChange("size", e.target.value)}
              >
                <option value="">Select Size</option>
                {productDetails?.sizes.length > 0 &&
                  productDetails?.sizes.map((size, sidx) => (
                    <option key={`size-${sidx}`} value={size}>
                      {size}
                    </option>
                  ))}
              </Select>
            </Options>

            <ActionSection>
              {isInCart ? (
                <AddToCart onClick={() => dispatch(toggleCart())}>
                  GO TO BAG
                </AddToCart>
              ) : (
                <AddToCart onClick={updateCart}>
                  {cartLoading ? <DotSpinner /> : "ADD TO BAG"}
                </AddToCart>
              )}
            </ActionSection>
            <ReturnInfo>
              <span className={Number(Stock) < 5 ? "red" : "green"}>
                {productDetails?.stock}
              </span>
              left in stock
            </ReturnInfo>
            <ReturnInfo>Free Delivery Over Orders Above ₹599</ReturnInfo>

            <ReturnInfo>
              7 days <ImLoop2 /> Replacement Policy
            </ReturnInfo>

            <ProductDetailsSection>
              <ProductDetailsHeading>Product Details</ProductDetailsHeading>
              <ProductDetailsInfo>
                <ProductDetailsRow>
                  <ProductDetailsType>Material Composition</ProductDetailsType>
                  <ProductDetailsTime>
                    70% Cotton And 25% Fleece
                  </ProductDetailsTime>
                </ProductDetailsRow>
                <ProductDetailsRow>
                  <ProductDetailsType>Material type</ProductDetailsType>
                  <ProductDetailsTime>Cotton, Fleece</ProductDetailsTime>
                </ProductDetailsRow>
                <ProductDetailsRow>
                  <ProductDetailsType>
                    Neck Style and Fit type
                  </ProductDetailsType>
                  <ProductDetailsTime>
                    Hooded Neck and Regular
                  </ProductDetailsTime>
                </ProductDetailsRow>
              </ProductDetailsInfo>
            </ProductDetailsSection>
          </InfoSection>
        </Container>

        <SimilarProducts />

        {productDetails?.comments && productDetails.comments.length > 0 && (
          <ReviewDetails>
            <ReviewHeading>Ratings and Reviews</ReviewHeading>
            <Grid>
              <div className="reviews">
                <ParallaxSwiper
                  slides={
                    productDetails?.comments.length > 0 &&
                    productDetails.comments
                  }
                />
              </div>
            </Grid>
          </ReviewDetails>
        )}

        <ReviewSection>
          <ReviewHeading>Give a Feedback</ReviewHeading>
          <ReviewForm productID={productDetails?.productID} />
        </ReviewSection>
      </div>
      <Footer header={true} />
    </ProductSection>
  );
};

export default ProductPage;

const ProductSection = styled.section`
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);

  .container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 2rem;

    @media (max-width: 479px) {
      padding: 0 0.5rem;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  padding: 12rem 1rem 4rem 1rem;
  color: white;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 479px) {
    padding: 8rem 1rem 4rem 1rem;
  }
`;

const ImageSection = styled.div`
  min-height: 327px;
  width: 100%;
  img {
    width: 100%;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;

  @media (max-width: 479px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const CurrentPrice = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  background-color: #f7accf;
  background-image: linear-gradient(147deg, #f7accf 0%, #ff1053 74%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 479px) {
    font-size: 2.2rem;
  }
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  text-decoration: line-through;
  color: #888;

  @media (max-width: 479px) {
    font-size: 1.1rem;
  }
`;

const Discount = styled.span`
  font-size: 1.5rem;
  color: #28a745;
  font-weight: bold;

  @media (max-width: 479px) {
    font-size: 1.1rem;
  }
`;

const Reviews = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    font-size: 1.2rem;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .activeColor {
    border: 2px solid blue;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ColorCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1.2rem;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
  color: white;
  border: 1px solid white;
`;

const ActionSection = styled.div`
  width: 100%;
`;

const AddToCart = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 900;
  color: #fff;
  border: none;
  cursor: pointer;
  background: linear-gradient(90deg, #ff00ff, #ff7300);
`;

const ProductDetailsSection = styled.div``;

const ReviewDetails = styled.div`
  @media (max-width: 479px) {
    padding: 0 1rem;
  }
`;

const ProductDetailsHeading = styled.h2`
  font-size: 1.7rem;
  margin: 1rem 0 1.5rem 0;
`;

const ReviewHeading = styled.h2`
  margin: 2rem auto;
  font-size: 1.8rem;
  text-align: left;
  color: white;

  @media (max-width: 479px) {
    font-size: 1.3rem;
  }
`;

const ProductDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductDetailsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const ProductDetailsType = styled.span`
  font-size: 1rem;

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const ProductDetailsTime = styled.span`
  font-size: 1rem;
  color: #888;

  @media (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const ReturnInfo = styled.div`
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;

  .green {
    color: green;
    font-weight: 800;
  }

  .red {
    color: red;
    font-weight: 800;
  }

  @media (max-width: 479px) {
    font-size: 0.9rem;

    svg {
      font-size: 0.9rem;
    }
  }
`;

const Grid = styled.div`
  max-width: 100%;
  margin: auto;
  display: flex;

  .reviews {
    width: 100%;
  }

  @media (max-width: 1520px) {
    padding: 0 0 0 0;
  }

  @media (max-width: 479px) {
    flex-wrap: wrap;
    gap: 2rem 0rem;
  }
`;

const ReviewSection = styled.div`
  color: white;
  @media (max-width: 479px) {
    padding: 0 1rem;
  }
`;
