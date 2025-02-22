import React from "react";
import styled from "styled-components";

const TermsAndConditions = () => {
  return (
    <PageContainer>
      <FlexBox>
        <Title>Terms And Conditions</Title>
        <Back href="/">Back</Back>
      </FlexBox>
      <LastUpdated>Last updated on: 14-02-2025</LastUpdated>

      <SectionTitle>1. Agreement to Terms</SectionTitle>
      <Paragraph>
        By accessing or using the Anox Clothing Brand website or purchasing any
        products from us, you agree to be bound by these Terms & Conditions.
        Please read them carefully. If you do not agree to these terms, you may
        not access or use the site or purchase any products.
      </Paragraph>

      <SectionTitle>2. Product Information</SectionTitle>
      <Paragraph>
        We strive to provide accurate product descriptions and images. However,
        slight variations in color may occur due to monitor settings.   We
        reserve the right to modify or discontinue products at any time without
        notice.  
      </Paragraph>

      <SectionTitle>3. Ordering</SectionTitle>
      <Paragraph>
        Orders can be placed online through our website. We reserve the right to
        refuse or cancel any order for any reason, including but not limited to
        product availability, errors in pricing or product information, or
        suspected fraudulent activity.
      </Paragraph>

      <SectionTitle>4. Payment</SectionTitle>
      <Paragraph>
        We accept secure payment methods, which includes Razorpay. All prices
        are in INR and are exclusive of applicable taxes and shipping costs.
        Payment must be received in full before the order is processed.
      </Paragraph>

      <SectionTitle>5. Shipping</SectionTitle>
      <Paragraph>
        We offer [Standard Shipping, Express Shipping, Same-Day & Next-Day
        Delivery, Cash on Delivery (COD) Shipping] with estimated delivery
        times.   Shipping costs are calculated based on the order total and
        delivery address. We are not responsible for any delays caused by
        shipping carriers or unforeseen circumstances.
      </Paragraph>

      <SectionTitle>6. Returns & Exchanges</SectionTitle>
      <Paragraph>
        We accept returns or exchanges within 2 days of delivery for
        [conditions, e.g., unworn, unwashed items in original condition]. Return
        shipping costs are the responsibility of the customer unless the return
        is due to our error. For exchanges, please contact us to arrange a
        return and place a new order for the desired item.
      </Paragraph>

      <SectionTitle>7. Privacy</SectionTitle>
      <Paragraph>
        We collect and use your personal information in accordance with our
        Privacy Policy. By using our website, you consent to the collection and
        use of your information as described in our Privacy Policy.  {" "}
      </Paragraph>

      <SectionTitle>8. Intellectual Property</SectionTitle>
      <Paragraph>
        All content on the Anox Clothing Brand website, including but not
        limited to text, images, logos, and trademarks, is protected by
        intellectual property laws. You may not use any of our intellectual
        property without our prior written consent.  {" "}
      </Paragraph>

      <SectionTitle>9. Limitation of Liability</SectionTitle>
      <Paragraph>
        We are not liable for any indirect, incidental, special, or
        consequential damages arising from the use of our website or products.  
        Our total liability to you for any claim arising from these Terms &
        Conditions is limited to the amount you paid for the product(s) in
        question.
      </Paragraph>

      <SectionTitle>10. Governing Law</SectionTitle>
      <Paragraph>
        These Terms & Conditions are governed by and construed in accordance
        with the laws of State of Karnataka.
      </Paragraph>

      <SectionTitle>11. Changes to Terms & Conditions</SectionTitle>
      <Paragraph>
        We reserve the right to modify these Terms & Conditions at any time
        without prior notice. The updated terms will be effective upon posting
        on our website.  
      </Paragraph>

      <SectionTitle>12. Contact Our Team</SectionTitle>
      <Paragraph>
        For any questions or concerns, please contact us at anustore04@gmail.com
        or +91-8167467001. Note: This is a sample Terms & Conditions document
        and may need to be modified to comply with specific legal requirements
        in your jurisdiction. It is recommended to consult with an attorney to
        ensure your Terms & Conditions are legally sound.
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

export default TermsAndConditions;

const PageContainer = styled.div`
  line-height: 1.6;
  margin: 20px auto 0 auto;
  padding: 20px;
  max-width: 900px;
  background-color: #f9f9f9;
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
