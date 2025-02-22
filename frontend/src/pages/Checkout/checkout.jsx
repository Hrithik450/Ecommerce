import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Address from "../../components/account/address";
import Footer from "../../components/layout/Footer";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  capturePayment,
  createNewOrder,
} from "../../store/slices/order/orderThunks";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { AlertObject } from "../../components/common/Config";
import CheckoutShimmer from "../../components/common/shimmers/checkout/CheckoutShimmer";
import CartShimmer from "../../components/common/shimmers/checkout/CartShimmer";
import CartCard from "../../components/cart/cartCard";

function ShoppingCheckout() {
  const navigate = useNavigate();

  const generateOrderId = () => {
    return `order_${uuidv4().slice(0, 14)}`;
  };

  const [Loading, setLoading] = useState(false);
  const [isPaymentStart, setisPaymentStart] = useState(false);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { cartItems, cartID, cartLoading } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { RefundBalance } = useSelector((state) => state.order);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const dispatch = useDispatch();

  const calculateCartTotals = (cartItems, paymentMethod) => {
    if (!cartItems || cartItems.length === 0) {
      return { subTotal: 0, discount: 0, shippingFee: 0 };
    }

    const subTotal = cartItems.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );

    const discount = cartItems.reduce(
      (acc, item) =>
        acc + (item.price - item.salePrice || 0) * (item.quantity || 1),
      0
    );

    let shippingFee = subTotal >= 1000 ? 0 : 48;

    if (paymentMethod === "COD") {
      shippingFee += 48;
    }

    return { subTotal, discount, shippingFee };
  };

  const Totals =
    isAuthenticated && cartItems?.length > 0
      ? calculateCartTotals(cartItems, paymentMethod)
      : null;

  let TotalFee = Totals
    ? Totals?.subTotal - Totals?.discount + Totals?.shippingFee
    : 0;
  const ToTalOrderAmout = TotalFee;

  let RemainingFunds = 0;
  const PrevFunds = RefundBalance !== undefined ? RefundBalance : 0;

  if (PrevFunds > 0 && PrevFunds !== undefined && PrevFunds >= TotalFee) {
    RemainingFunds = PrevFunds - TotalFee + 100;
    TotalFee = 100;
  } else if (PrevFunds !== undefined && TotalFee - PrevFunds >= 100) {
    RemainingFunds = 0;
    TotalFee = TotalFee - PrevFunds;
  } else if (PrevFunds > 0 && PrevFunds !== undefined && PrevFunds < TotalFee) {
    RemainingFunds = 100;
    TotalFee = TotalFee - PrevFunds + 100;
  }

  const handleInitiatePayment = async () => {
    if (cartItems.length === 0) {
      return toast.error(
        "Your cart is empty. Please add items to proceed",
        AlertObject
      );
    }

    const allValid =
      cartItems !== null &&
      cartItems?.every(
        (item) =>
          item?.color !== null &&
          item?.size !== null &&
          item?.color !== "" &&
          item?.size !== ""
      );

    if (!allValid) {
      return toast.error(
        "Please Select Color and Size of Cart Items",
        AlertObject
      );
    }

    if (!user?.isVerified) {
      return toast.error(
        "Please verify your email address before placing order",
        AlertObject
      );
    }

    if (currentSelectedAddress === null) {
      return toast.error("Please select one address to proceed.", AlertObject);
    }

    if (user !== null && PrevFunds !== undefined) {
      const orderData = {
        cartID,
        cartItems:
          cartItems !== null &&
          cartItems.map((singleCartItem) => ({
            productID: singleCartItem?.productID,
            productName: singleCartItem?.productName,
            image: singleCartItem?.image,
            quantity: singleCartItem?.quantity,
            salePrice: singleCartItem?.salePrice,
            color: singleCartItem?.color,
            size: singleCartItem?.size,
          })),
        addressInfo: {
          addressID: currentSelectedAddress?.addressID,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          pincode: currentSelectedAddress?.pincode,
          phone: currentSelectedAddress?.phone,
          email: currentSelectedAddress?.email,
        },
        orderStatus: "pending",
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
        ToTalOrderAmout: ToTalOrderAmout,
        totalAmount: TotalFee,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        paymentId: "",
        payerId: "",
      };

      try {
        setisPaymentStart(true);

        if (paymentMethod === "COD") {
          const res = await dispatch(
            capturePayment({
              orderData,
              orderID: generateOrderId(),
              RemainingFunds: RemainingFunds,
              paymentID: "Pending",
              paymentMethod: "COD",
            })
          ).unwrap();
          if (res.success) {
            navigate("/");
          }
        } else {
          const res = await dispatch(
            createNewOrder({ totalAmount: orderData.totalAmount })
          ).unwrap();

          if (res.success) {
            try {
              const loadscript = (src) => {
                return new Promise((resolve) => {
                  const script = document.createElement("script");

                  script.src = src;
                  script.onload = () => {
                    resolve(true);
                  };

                  script.onerror = () => {
                    resolve(false);
                  };

                  document.body.appendChild(script);
                });
              };

              await loadscript("https://checkout.razorpay.com/v1/checkout.js");

              const options = {
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: res.amount,
                currency: "INR",
                name: "ANOX",
                description: "Paying to ANOX",
                image:
                  "https://res.cloudinary.com/duozomapm/image/upload/v1737799706/AnuvBanner2_lp8bqd.jpg",
                order_id: res.orderID,
                prefill: {
                  name: user?.username,
                  email: user?.email,
                },
                theme: {
                  color: "#F4C430",
                },
                handler: async function (response) {
                  setLoading(true);
                  const resp = await dispatch(
                    capturePayment({
                      orderData,
                      orderID: res.orderID,
                      RemainingFunds: RemainingFunds,
                      paymentID: response.razorpay_payment_id,
                      paymentMethod: paymentMethod,
                    })
                  ).unwrap();
                  if (resp?.success) {
                    setLoading(false);
                    navigate("/");
                  }
                },
                redirect: true,
              };

              const paymentObject = new window.Razorpay(options);
              paymentObject.open();

              paymentObject.on("payment.failed", function (response) {
                toast.error(response.error, AlertObject);
              });
            } catch (error) {
              toast.error(error, AlertObject);
            }
          }
        }
      } catch (error) {
        toast.error(error, AlertObject);
      } finally {
        setisPaymentStart(false);
      }
    }
  };

  if (Loading) {
    return <div>Loading...</div>;
  }

  return (
    <StyledCheckoutContainer>
      <StyledImageContainer>
        <a href="/products">
          <IoArrowBackSharp className="back-svg" />
        </a>
        <StyledImage
          src={
            "https://res.cloudinary.com/duozomapm/image/upload/v1737799706/AnuvBanner2_lp8bqd.jpg"
          }
        />
      </StyledImageContainer>
      <StyledGridContainer>
        <div className="leftSection">
          <CardContainer>
            <h2>Your Cart Items</h2>
            {cartLoading
              ? [...Array(cartItems.length)].map((_, pidx) => (
                  <CartShimmer key={`shimmer-${pidx}`} />
                ))
              : isAuthenticated && cartItems && cartItems.length > 0
              ? cartItems.map((item, iidx) => (
                  <CartCard item={item} key={`cart-${iidx}`} />
                ))
              : null}
          </CardContainer>
        </div>

        <div className="rightSection">
          <h2>Billing Details</h2>
          {cartLoading ? (
            <CheckoutShimmer />
          ) : (
            <div className="bottom-nav">
              <ProductDetailsSection>
                <ProductDetailsInfo>
                  <ProductDetailsRow>
                    <ProductDetailsType>
                      Total Before Discounts:
                    </ProductDetailsType>
                    <ProductDetailsTime>
                      Rs. {Totals?.subTotal || "0"}/-
                    </ProductDetailsTime>
                  </ProductDetailsRow>
                  <ProductDetailsRow>
                    <ProductDetailsType>Discount Applied:</ProductDetailsType>
                    <ProductDetailsTime>
                      Rs. {Totals?.discount || "0"}/-✅ (You saved this amount!)
                    </ProductDetailsTime>
                  </ProductDetailsRow>
                  <ProductDetailsRow>
                    <ProductDetailsType>Shipping Fee:</ProductDetailsType>
                    <ProductDetailsTime>
                      {paymentMethod === "COD"
                        ? ` Rs. ${Totals?.shippingFee || "0"}/-📦`
                        : "FREE DELIVERY"}
                    </ProductDetailsTime>
                  </ProductDetailsRow>
                  {RefundBalance !== 0 && (
                    <>
                      <ProductDetailsRow>
                        <ProductDetailsType>
                          Refund Amount Applied:
                        </ProductDetailsType>
                        <ProductDetailsTime>
                          Rs.{" "}
                          {(RefundBalance !== undefined && RefundBalance) ||
                            "0"}
                          /- 🔄
                        </ProductDetailsTime>
                      </ProductDetailsRow>
                      <ProductDetailsRow>
                        <ProductDetailsType>
                          Remaining Refund Balance:
                        </ProductDetailsType>
                        <ProductDetailsTime>
                          Rs. {RemainingFunds || "0"}/-🏦
                        </ProductDetailsTime>
                      </ProductDetailsRow>
                    </>
                  )}
                </ProductDetailsInfo>
                <PaymentType>
                  <label>
                    <input
                      type="radio"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                    />
                    Pay on COD <span>(₹48 shipping charge)</span>
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="Razorpay"
                      checked={paymentMethod === "Razorpay"}
                      onChange={() => setPaymentMethod("Razorpay")}
                    />
                    Pay via UPI <span>(₹0 shipping charge)</span>
                  </label>
                </PaymentType>
              </ProductDetailsSection>

              <Total>
                <TotalLabel>Total</TotalLabel>
                <TotalPrice>₹{TotalFee}</TotalPrice>
              </Total>

              <CheckoutButton onClick={handleInitiatePayment}>
                {isPaymentStart
                  ? paymentMethod === "COD"
                    ? "Placing Order..."
                    : "Processing Payment..."
                  : paymentMethod === "COD"
                  ? "Place Order"
                  : "Proceed for Payment"}
              </CheckoutButton>
            </div>
          )}

          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        </div>
      </StyledGridContainer>

      <Footer header={true} />
    </StyledCheckoutContainer>
  );
}

export default ShoppingCheckout;

const StyledCheckoutContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #2b4162;
  background-image: linear-gradient(315deg, #2b4162 0%, #12100e 74%);
`;

const StyledImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 300px;
  width: 100%;

  .back-svg {
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    background: black;
    padding: 0.5rem;
    font-size: 2rem;
    color: white;
    top: 1rem;
    left: 2rem;

    @media (max-width: 479px) {
      left: 1rem;
    }
  }
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const StyledGridContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 4rem auto 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 1rem;

  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: flex-start;
    margin: 0;
  }

  .leftSection {
    min-width: 450px;

    @media (max-width: 479px) {
      min-width: 100%;
    }
  }

  .rightSection {
    h2 {
      color: white;
    }

    .bottom-nav {
      padding: 1.5rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin: 2rem 0;
    }

    @media (max-width: 768px) {
      max-width: 450px;
    }

    @media (max-width: 479px) {
      width: 100%;
    }
  }
`;

const CardContainer = styled.div`
  max-width: 450px;
  margin: auto;
  display: grid;
  row-gap: 2rem;

  h2 {
    color: white;

    @media (max-width: 991px) {
      margin-top: 1rem;
    }
  }
`;

const ProductDetailsSection = styled.div`
  margin: 1rem 0;
  color: white;
`;

const ProductDetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: white;
`;

const PaymentType = styled.div`
  margin: 1rem 0 1rem 0;
  display: grid;
  row-gap: 1rem;

  label {
    display: flex;
    align-items: center;
    font-weight: 900;
    font-size: 1rem;
    gap: 0.5rem;

    span {
      color: #28a745;
    }

    @media (max-width: 479px) {
      font-size: 0.9rem;
    }
  }
`;

const ProductDetailsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  color: white;
`;

const ProductDetailsType = styled.span`
  font-size: 1rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.75);

  @media (max-width: 479px) {
    font-size: 0.8rem;
  }
`;

const ProductDetailsTime = styled.span`
  font-size: 1rem;
  color: white;
  font-weight: 900;

  @media (max-width: 479px) {
    font-size: 0.8rem;
  }
`;

const CheckoutButton = styled.button`
  padding: 1rem;
  font-size: 1.2rem;
  background: linear-gradient(90deg, #ff00ff, #ff7300);
  color: #fff;
  border: none;
  cursor: pointer;
  text-align: center;
  width: 100%;
  font-weight: 800;

  &:hover {
    background-color: #444;
  }

  @media (max-width: 479px) {
    font-size: 1rem;
  }
`;

const Total = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;

  @media (max-width: 479px) {
    font-size: 1.3rem;
  }
`;

const TotalLabel = styled.p`
  margin: 0;
`;

const TotalPrice = styled.p`
  margin: 0;
`;
