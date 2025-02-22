import React from "react";
import styled from "styled-components";

const ContactUs = () => {
  return (
    <PageContainer>
      <FlexBox>
        <Title>Contact Us</Title>
        <Back href="/">Back</Back>
      </FlexBox>
      <LastUpdated>Last updated on: 14-02-2025</LastUpdated>

      <SectionTitle>Get in Touch</SectionTitle>
      <Paragraph>
        We’d love to hear from you! If you have any questions, concerns, or
        feedback, feel free to reach out to us.
      </Paragraph>

      <SectionTitle>Contact Information</SectionTitle>
      <ul>
        <li>Email: anustore04@gmail.com</li>
        <li>Phone: +91-8167467001</li>
        <li>Address: Bangalore, Karnataka</li>
      </ul>

      <SectionTitle>Business Hours</SectionTitle>
      <ul>
        <li>Monday - Friday: 9:00 AM - 6:00 PM (IST)</li>
        <li>Saturday: 10:00 AM - 4:00 PM (IST)</li>
        <li>Sunday: Closed</li>
      </ul>

      <SectionTitle>Customer Support</SectionTitle>
      <Paragraph>
        For order-related inquiries, refunds, or shipping concerns, please visit
        our Help Center or email us directly.
      </Paragraph>

      <SectionTitle>Follow Us</SectionTitle>

      <ul>
        <li>
          <a href="https://www.instagram.com/anoxfashion?utm_source=qr&igsh=cTRwaXRmdHBzd3Y2">
            Instagram
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/hruthik-m-3595a0329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://youtube.com/@mhrithik450?si=0a4luiMfbWBBLmoI">
            Youtube
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/share/15Qw2rcR8o/">Facebook</a>
        </li>
      </ul>
      <Paragraph>
        Stay connected with us on social media for the latest updates, offers,
        and new arrivals. <br /> We look forward to assisting you!
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

export default ContactUs;

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
