import React from "react";
import styled from "styled-components";

const ShippingPolicy = () => {
  return (
    <PageContainer>
      <FlexBox>
        <Title>Shipping Policy</Title>
        <Back href="/">Back</Back>
      </FlexBox>
      <LastUpdated>Last updated on: 14-02-2025</LastUpdated>

      <SectionTitle>1. Shipping Methods & Delivery Time</SectionTitle>
      <Paragraph>
        We offer multiple shipping methods to ensure a smooth delivery
        experience:
      </Paragraph>
      <ul>
        <li>
          Standard Shipping: Estimated delivery time of 5-7 business days.
        </li>
        <li>Express Shipping: Estimated delivery time of 2-4 business days.</li>
        <li>Same-Day/Next-Day Delivery (Available in select locations).</li>
      </ul>
      <Paragraph>
        Delivery times are estimates and may vary due to factors such as
        location, weather, and carrier delays.
      </Paragraph>

      <SectionTitle>2. Shipping Charges</SectionTitle>
      <ul>
        <li>
          Shipping charges are calculated based on the total order value,
          shipping method, and delivery location.
        </li>
        <li>
          Free shipping may be available for orders exceeding a certain amount
          (as per promotional offers).
        </li>
        <li>
          International shipping fees vary based on the destination and selected
          shipping method.
        </li>
      </ul>

      <SectionTitle>3. Order Processing</SectionTitle>
      <ul>
        <li>
          Orders are processed within 1-2 business days after payment
          confirmation.
        </li>
        <li>
          Orders placed on weekends or holidays will be processed on the next
          business day.
        </li>
        <li>
          Customers will receive an order confirmation email along with tracking
          details once the order is shipped.
        </li>
      </ul>

      <SectionTitle>4. Shipping Restrictions</SectionTitle>
      <ul>
        <li>
          We currently ship within India and selected international locations.
        </li>
        <li>We do not ship to P.O. Boxes or restricted areas.</li>
        <li>
          Any customs duties or taxes for international shipments are the
          responsibility of the customer.
        </li>
      </ul>

      <SectionTitle>5. Tracking Orders</SectionTitle>
      <ul>
        <li>
          Customers can track their order status using the tracking number
          provided via email.
        </li>
        <li>
          If tracking information is unavailable, please allow 24-48 hours for
          updates or contact our support team.
        </li>
      </ul>

      <SectionTitle>6. Delivery Issues & Delays</SectionTitle>
      <ul>
        <li>
          We are not responsible for delays caused by shipping carriers, weather
          conditions, or unforeseen circumstances.
        </li>
        <li>
          In case of a delay beyond the expected timeframe, please reach out to
          our customer support team.
        </li>
        <li>
          If a package is lost in transit, we will initiate an investigation and
          provide assistance in resolving the issue.
        </li>
      </ul>

      <SectionTitle>7. Damaged or Missing Items</SectionTitle>
      <ul>
        <li>
          If an order arrives damaged or is missing items, customers must notify
          us within 48 hours of delivery.
        </li>
        <li>
          To initiate a claim, provide images of the damaged package along with
          order details.
        </li>
        <li>
          We will assess the claim and offer a replacement or refund as
          applicable.
        </li>
      </ul>

      <SectionTitle>8. Return to Sender & Incorrect Addresses</SectionTitle>
      <ul>
        <li>
          If an order is returned due to an incorrect address provided by the
          customer, re-shipping charges may apply.
        </li>
        <li>
          If a package is undeliverable and returned to us, we will contact the
          customer to arrange reshipment or a refund (excluding shipping fees).
        </li>
      </ul>

      <SectionTitle>9. Contact Us</SectionTitle>
      <Paragraph>
        For any shipping-related queries or concerns, please contact our support
        team at anustore04@gmail.com or +91-8167467001.
      </Paragraph>

      <Paragraph>
        Note: This policy may be updated periodically. Customers are encouraged
        to review it before placing an order.
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

export default ShippingPolicy;

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
