import React from "react";
import styled from "styled-components";

const PrivacyPolicy = () => {
  return (
    <PageContainer>
      <FlexBox>
        <Title>Privacy Policy</Title>
        <Back href="/">Back</Back>
      </FlexBox>
      <LastUpdated>Last updated on: 14-02-2025</LastUpdated>

      <SectionTitle>1. Introduction</SectionTitle>
      <Paragraph>
        At Anox Clothing Brand, we respect your privacy and are committed to
        protecting your personal information. This Privacy Policy outlines how
        we collect, use, disclose, and safeguard your information when you visit
        our website or purchase our products. By using our website, you consent
        to the collection and use of your personal data in accordance with this
        policy. If you do not agree, please refrain from using our website.
      </Paragraph>

      <SectionTitle>2. Information We Collect</SectionTitle>
      <Paragraph>
        We may collect the following types of information:  
      </Paragraph>
      <Paragraph>A. Personal Information</Paragraph>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Billing and shipping addresses</li>
        <li>
          Payment details (processed securely through third-party payment
          providers)
        </li>
        <li>Purchase history</li>
      </ul>
      <Paragraph>B. Non-Personal Information</Paragraph>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Device information</li>
        <li>Website usage data (e.g., pages visited, time spent on site)</li>
        <li>
          Cookies and tracking technologies (see Section 7: Cookies Policy)
        </li>
      </ul>

      <SectionTitle>3. How We Use Your Information</SectionTitle>
      <Paragraph>We use your information for the following purposes:</Paragraph>
      <ul>
        <li>To process and fulfill your orders</li>
        <li>To provide customer support</li>
        <li>To improve our website and services</li>
        <li>
          To send you order confirmations, updates, and promotional content
          (only with your consent)
        </li>
        <li>To personalize your shopping experience </li>
        <li>To prevent fraud and unauthorized transactions</li>
        <li>To comply with legal obligations</li>
      </ul>

      <SectionTitle>4. How We Share Your Information</SectionTitle>
      <Paragraph>
        We do not sell or rent your personal information. However, we may share
        your data with:
      </Paragraph>
      <ul>
        <li>
          Service Providers: Third-party payment processors, shipping companies,
          and IT service providers to facilitate order fulfillment.
        </li>
        <li>
          Legal Authorities: If required by law, court order, or legal
          proceedings.
        </li>
        <li>
          Marketing Partners: With your consent, we may share your email with
          partners for marketing campaigns.
        </li>
      </ul>

      <SectionTitle>5. Data Security</SectionTitle>
      <Paragraph>
        We implement industry-standard security measures to protect your
        personal data. However, no method of transmission over the internet is
        100% secure. By using our website, you acknowledge that you provide your
        personal information at your own risk.
      </Paragraph>

      <SectionTitle>6. Your Rights & Choices</SectionTitle>
      <Paragraph>
        You have the following rights regarding your personal data:
      </Paragraph>
      <ul>
        <li>
          Access & Correction: Request access to or correction of your personal
          information.
        </li>
        <li>Opt-Out: Unsubscribe from marketing emails at any time.</li>
        <li>
          Data Deletion: Request deletion of your data, subject to legal
          requirements.
        </li>
        <li>
          Restrict Processing: Limit how we use your data under certain
          conditions.
        </li>
      </ul>
      <Paragraph>
        To exercise these rights, contact us at anustore04@gmail.com
      </Paragraph>

      <SectionTitle>7. Cookies Policy</SectionTitle>
      <Paragraph>
        We use cookies and similar tracking technologies to enhance user
        experience and analyze website traffic. You can manage your cookie
        preferences through your browser settings.
      </Paragraph>

      <SectionTitle>8. Third-Party Links</SectionTitle>
      <Paragraph>
        Our website may contain links to third-party sites. We are not
        responsible for the privacy practices of these sites and encourage you
        to review their privacy policies.
      </Paragraph>

      <SectionTitle>9. Children's Privacy</SectionTitle>
      <Paragraph>
        Our website is not intended for individuals under the age of 13. We do
        not knowingly collect personal information from minors. If you believe
        we have collected information from a child, please contact us for
        removal.
      </Paragraph>

      <SectionTitle>10. Changes to This Privacy Policy</SectionTitle>
      <Paragraph>
        We may update this Privacy Policy from time to time. The revised policy
        will be effective upon posting on our website. We encourage you to
        review this page periodically.
      </Paragraph>

      <SectionTitle>11. Contact Information</SectionTitle>
      <Paragraph>
        For questions or concerns regarding this Privacy Policy, please contact
        us at:
      </Paragraph>
      <ul>
        <li>Email: anustore04@gmail.com</li>
        <li>Phone: +91-8167467001</li>
        <li>Address: Bangalore, Karnataka</li>
      </ul>
      <Paragraph>
        By using our website, you acknowledge that you have read and understood
        this Privacy Policy and agree to its terms.
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

export default PrivacyPolicy;

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
  margin: 10px 0;
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 0.8rem;
  margin-top: 30px;
  color: #888;
`;
