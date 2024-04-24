import Header from '../components/header';
import Footer from '../components/footer';
import TopImage from '../components/top-image';
import { Link } from "react-router-dom";


export default function PrivacyPage() {
  return (
    <>
    <Header />
        <main>
          <TopImage />
          <article className='side-padding'>
            <h1>Math Rocks Privacy Policy</h1> 
            <h2>1. About this Privacy Policy</h2>
            <p>This Privacy Policy applies to your access to or use of our websites, applications, and other services.</p>
            <p>During the registration process for our products and services and in other registration forms, we will indicate the types of personal information you must provide and the types of personal information we request. You may choose not to submit the information we request, but that may limit or prevent Math Rock from providing you with the Services.</p>
            <h2>2. Information We Collect</h2>
            <p>We collect information about you in three ways: directly from what you enter, from third-party sources, and with the help of automated technologies.</p>
            <h3>2.1 Data you provide to us</h3>
            <p>The types of personal information we collect directly from you, depending on how you interact with us and the Services, may include:</p>
            <ul>
              <li>Contact details, such as your name, email address, postal address, social media aliases, and phone number;</li>
              <li>Account login credentials, such as username and password, password hints, and similar security information;</li>
              <li>Other account registration and profile information, such as job title, educational/professional background and qualifications, and photographs;</li>
              <li>Comments, feedback, and other information that you provide to us, such as search query data and questions, or information you send to customer support;</li>
              <li>Interests and communication preferences.</li>
            </ul>
            <h3>2.2 Data from Other Sources</h3>
            <p>We may also obtain your contact details and other information about you from our affiliates and other third parties, including:</p>
            <ul>
              <li>The social network you use when you grant permission to the Service to access your data on one or more social networks;</li>
              <li>Service providers who can help us determine locations so that certain products can be targeted to your location;</li>
              <li>Businesses with whom we partner to provide co-branded services or participate in joint marketing activities.</li>
            </ul>
            <h3>3. How We Use Your Information</h3>
            <p>Depending on how you interact with us and the Services, we may use your personal information to:</p>
            <ul>
              <li>To provide, activate, and manage your access to and use of the Services;</li>
              <li>to process and fulfill requests, orders, downloads, subscriptions, or other transactions;</li>
              <li>To provide technical, product, and other support to help keep the Services functional, secure, and stable</li>
              <li>To enhance and improve the Services and our other products, activities and services, and to develop new products, services, and benefits;</li>
              <li>to respond to your requests, inquiries, comments, and concerns;</li>
              <li>To notify you of changes, updates, and other announcements related to the Service and our other products and services</li>
              <li>To comply with our legal obligations, resolve disputes, and enforce our agreements.</li>
            </ul>
            <h2>4. Sharing Your Information</h2>
            <h3>4.1 Application Licensors</h3>
            <p>If you access the application on the Services through a license agreement with the licensor of a third-party application, personal information associated with that third-party application may be shared with that licensor so that it can provide you with access to the application in accordance with the terms of the license agreement and privacy policy. </p>
            <h3>4.2 For Legal Reasons</h3>
            <p>We will also disclose your personal information when we believe it is reasonably necessary for the following purposes:</p>
            <ul>
              <li>to comply with any applicable law, regulation, legal process or other legal obligation;</li>
              <li>detect, investigate, and help prevent security, fraud, or technical issues;</li>
              <li>to protect the rights, property, or safety of Math Rock, our users, employees, or others;</li>
              <li>Completing corporate matters, such as asset transfers, acquisitions by other companies, or mergers with other companies.</li>
            </ul>
            <h2>5. Basis for processing</h2>
            <p>When we collect or otherwise process any personal information within the framework of applicable data protection laws, we do so in order to:</p>
            <ul>
              <li>To provide the Services, complete a transaction, perform a contract with you, or perform an action at your request prior to entering into a contract;</li>
              <li>To comply with applicable laws or other legal obligations;</li>
              <li>To carry out tasks that are in the public interest;</li>
              <li>To enable our customers to comply with their legal obligations;</li>
              <li>To do so with your consent (where applicable) and/or to enable our customers to comply with their legal obligations;</li>
              <li>To operate our business, to protect the security of our systems, customers, and users, to detect or prevent fraud, or to maintain other legitimate interests as described in Sections 2-4 above (except where your privacy interests are overridden).</li>
            </ul>
            <p>Where we rely on your consent to process personal information, you have the right to withdraw your consent at any time, and you may have the right to object to our processing of personal information where we are exercising our legitimate interests.</p>
            <h2>6. Data Retention</h2>
            <p>We will retain your personal information for as long as necessary to provide the Services, complete the transactions you have requested, or for other necessary purposes, such as to comply with legal obligations, maintain business and financial records, resolve disputes, maintain security, detect and prevent fraud and abuse, and enforce agreements. If you access the Services through a subscription managed or sponsored by your organization, we will retain your organization's contact information for continued communication with you after your organization terminates your subscription.</p>

            <h2>7. Data Security</h2>
            <p>We will implement a variety of technical and organisational measures to ensure a level of security appropriate to the risk to the personal information we process. These measures are designed to ensure the integrity, confidentiality, and availability of personal information.</p>

            <h2>8. Children's Privacy</h2>
            <p>We do not knowingly collect information from children under the age of 14.</p>

            <h2>9. Accessing and Updating Your Information</h2>
          
              <h3>9.1 Your Account</h3>
      
            <p>
              The Service may allow registered users to directly access and review their account information at any time and to make corrections or updates after logging in. It is the user's responsibility to keep such information up to date. Registered users may also close their accounts directly through the Service or by contacting the Service's customer support department.
            </p>

            <h3>9.2 Your Rights</h3>
            <p>
              In accordance with applicable privacy and data protection laws, you have the right, free of charge, to:
            </p>
            <ul>
              <li>Access to your personal information;</li>
              <li>To correct or erase your personal information;</li>
              <li>Restrict or object to our processing of your personal information;</li>
              <li>Portability of your personal information.</li>
            </ul>
            
            <h2>10. Changes</h2>
            <p>We may update this Privacy Policy from time to time. We will post any changes on this page along with the updated revision date. Once we make any material changes, we will notify you through the Service or otherwise.</p>
            <h2>11. Contact Information</h2>
            <p>If you have any questions, comments, complaints or requests about this Privacy Policy or our handling of your information, please <Link to={`/contact`}>contact us</Link>. </p>
        
            </article>
        </main>
        <Footer />
    </>
  );
}
