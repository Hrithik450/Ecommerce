import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DotSpinner from "../common/dotSpinner";
import { updateProduct } from "../../store/slices/products/productThunks";

const ReviewForm = ({ productID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productLoading } = useSelector((state) => state.product);
  const [formData, setformData] = useState({
    rating: 0,
    review: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user !== null) {
      const res = await dispatch(
        updateProduct({
          updatedData: {
            comments: {
              ...formData,
              username: user?.username,
              profile: user?.profile || null,
            },
          },
          productID: productID,
        })
      ).unwrap();
      if (res.success) {
        return setformData({
          rating: 0,
          review: "",
        });
      }
    }
  };

  const handleChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleDiscard = () => {
    setformData({
      rating: 0,
      review: "",
    });
  };

  return (
    <Container>
      <RatingSection>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={formData.rating >= star}
            onClick={() => handleChange("rating", star)}
          >
            ★
          </Star>
        ))}
      </RatingSection>

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="review">Review</Label>
        <Textarea
          id="review"
          value={formData.review}
          onChange={(e) => handleChange("review", e.target.value)}
          placeholder="Write your review here"
          rows="5"
          required
        />

        <Disclaimer>
          By clicking submit, you accept our{" "}
          <PrivacyLink href="#">Privacy Policy</PrivacyLink>.
        </Disclaimer>

        <ButtonGroup>
          <SubmitButton type="submit">
            {productLoading ? <DotSpinner /> : "Submit"}
          </SubmitButton>
          <DiscardButton type="button" onClick={handleDiscard}>
            Discard
          </DiscardButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto 0 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

const Star = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#ffc107" : "#ccc")};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;

  @media (max-width: 479px) {
    font-size: 1rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  color: white;
  padding: 1rem;
  font-size: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  outline: none;
  background: rgba(0, 0, 0, 0.2);

  @media (max-width: 479px) {
    font-size: 1rem;
  }
`;

const Disclaimer = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;

  @media (max-width: 479px) {
    font-size: 0.7rem;
  }
`;

const PrivacyLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 2rem;
  font-size: 1.2rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }

  @media (max-width: 479px) {
    font-size: 1rem;
  }
`;

const DiscardButton = styled.button`
  padding: 0.5rem 2rem;
  font-size: 1.2rem;
  background-color: #fff;
  color: #28a745;
  border: 1px solid #28a745;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }

  @media (max-width: 479px) {
    font-size: 1rem;
  }
`;

export default ReviewForm;
