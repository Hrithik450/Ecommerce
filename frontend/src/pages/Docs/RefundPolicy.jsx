import React from "react";
import styled from "styled-components";

const RefundPolicy = () => {
  return (
    <PageContainer>
      <FlexBox>
        <Title>Refunds and Cancellation Policy</Title>
        <Back href="/">Back</Back>
      </FlexBox>
      <LastUpdated>Last updated on: 14-02-2025</LastUpdated>

      <SectionTitle>1. Order Cancellation</SectionTitle>

      <ul>
        <li>
          Orders can be canceled within 24 hours of placement for a full refund.
        </li>
        <li>Once an order is processed or shipped, it cannot be canceled.</li>
        <li>
          To cancel an order, please contact our customer support at
          anustore04@gmail.com or +91-8167467001.
        </li>
      </ul>

      <SectionTitle>2. Refund Policy</SectionTitle>
      <ul>
        <li>
          Refunds are applicable only for eligible returns (see Return Policy
          below).
        </li>
        <li>
          Refunds will be processed within [number] business days after
          approval.
        </li>
        <li>
          The refunded amount will be credited to the original payment method
          used during purchase.
        </li>
        <li>
          Shipping fees are non-refundable, except in cases where the return is
          due to our error.
        </li>
      </ul>

      <SectionTitle>3. Return Policy</SectionTitle>
      <ul>
        <li>
          We accept returns within 7 days of delivery for unused, unwashed, and
          undamaged items in their original packaging.
        </li>
        <li>
          Return requests can be initiated by contacting our support team at
          anustore04@gmail.com.
        </li>
        <li>
          Customers are responsible for return shipping costs unless the return
          is due to a defective or incorrect item.
        </li>
      </ul>

      <SectionTitle>4. Exchange Policy</SectionTitle>
      <ul>
        <li>
          Exchanges are allowed within [number] days of delivery for a different
          size or color (subject to availability).
        </li>
        <li>
          Customers must return the original item before the replacement is
          shipped.
        </li>
        <li>Exchange requests can be made via our support team.</li>
      </ul>

      <SectionTitle>5. Non-Refundable Items</SectionTitle>
      <ul>
        <li>
          Items marked as Final Sale or Customized Orders cannot be refunded or
          exchanged.
        </li>
        <li>
          Products damaged due to customer mishandling are not eligible for
          return or refund.
        </li>
      </ul>

      <SectionTitle>6. Processing Time</SectionTitle>
      <ul>
        <li>
          Refunds are processed within 7 business days after the returned item
          is received and inspected.
        </li>
        <li>
          Depending on the payment provider, it may take additional time for the
          refunded amount to reflect in your account.
        </li>
      </ul>

      <SectionTitle>7. Contact Us</SectionTitle>
      <Paragraph>
        For any questions regarding refunds, cancellations, or returns, feel
        free to reach out to us at anustore04@gmail.com or call +91-8167467001.
      </Paragraph>

      <Footer>
        Thank you for using ANOX. We appreciate your adherence to our Terms of
        Service. For any questions or support, please contact us at{" "}
        <strong>anustore04@gmail.com</strong>.
        <br />
        Copyright © 2025 ANOX. All Rights Reserved.
      </Footer>
    </PageContainer>
  );
};

export default RefundPolicy;

const PageContainer = styled.div`
  line-height: 1.6;
  margin: 20px auto 0 auto;
  padding: 20px;
  max-width: 900px;
  background-color: #f9f9f9;

  ul {
    padding: 0 1rem;
    li {
      font-size: 1rem;
      color: #555;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const Back = styled.a`
  cursor: pointer;
  max-height: max-content;
  text-decoration: none;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 2rem;

  @media (max-width: 479px) {
    font-size: 1.5rem;
  }
`;

const LastUpdated = styled.p`
  font-style: italic;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-top: 20px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 0.8rem;
  margin-top: 30px;
  color: #888;
`;
