import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AddressShimmer from "../common/shimmers/account/AddressShimmer";
import AddressCard from "./addressCard";
import NewAddressForm from "./addressForm";

function Address({ setCurrentSelectedAddress, selectedId }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { addressList, addressLoading } = useSelector((state) => state.address);
  const { cartLoading } = useSelector((state) => state.cart);

  return (
    <StyledAddress>
      {isAuthenticated && (
        <>
          {addressList && addressList.length > 0 && <h2>Saved Address</h2>}
          <div className="cards">
            {cartLoading || addressLoading
              ? [...Array(2)].map((_, pidx) => (
                  <AddressShimmer key={`shimmer-${pidx}`} />
                ))
              : addressList &&
                addressList.length > 0 &&
                addressList.map((addr, aidx) => (
                  <AddressCard
                    addr={addr}
                    selectedId={selectedId}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    key={`addr-${aidx}`}
                  />
                ))}
          </div>
        </>
      )}

      <NewAddressForm />
    </StyledAddress>
  );
}

export default Address;

const StyledAddress = styled.div`
  h2 {
    margin: 1rem 0;
    font-weight: 900;
    font-size: 1.8rem;
  }

  .cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 991px) {
      grid-template-columns: 1fr;
    }
  }
`;
