import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import './LegalPage.css';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-content">
          <Link to="/" className="legal-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </Link>
          <div className="legal-badge">Legal Document</div>
          <h1 className="legal-hero-title">Privacy Policy</h1>
          <p className="legal-hero-sub">
            Last updated: {new Date().toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="legal-main">
        <div className="legal-container">
          {/* TOC */}
          <aside className="legal-toc">
            <h2 className="toc-title">Contents</h2>
            <ol className="toc-list">
              <li><a href="#intro">Introduction</a></li>
              <li><a href="#data-collected">Information We Collect</a></li>
              <li><a href="#data-use">How We Use Your Information</a></li>
              <li><a href="#data-sharing">Information Sharing</a></li>
              <li><a href="#data-retention">Data Retention</a></li>
              <li><a href="#your-rights">Your Rights</a></li>
              <li><a href="#cookies">Cookies &amp; Tracking</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#third-parties">Third-Party Links</a></li>
              <li><a href="#changes">Changes to This Policy</a></li>
              <li><a href="#contact-legal">Contact Us</a></li>
            </ol>
          </aside>

          {/* Body */}
          <article className="legal-body">
            <section id="intro" className="legal-section">
              <h2>1. Introduction</h2>
              <p>
                Little Talk Restaurants Management LLC ("Little Talk", "we", "our", or "us") is committed to protecting
                your personal information and your right to privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website or engage with our consulting
                services.
              </p>
              <p>
                By accessing our services, you acknowledge that you have read, understood, and agree to be bound by all
                the terms of this Privacy Policy. If you do not agree, please discontinue use of our services.
              </p>
            </section>

            <section id="data-collected" className="legal-section">
              <h2>2. Information We Collect</h2>
              <p>We may collect the following categories of personal information:</p>

              <h3>2.1 Information You Provide Directly</h3>
              <ul>
                <li><strong>Contact Data:</strong> Name, email address, phone number, and company name when you fill out our inquiry or contact forms.</li>
                <li><strong>Communication Data:</strong> The content of any messages, inquiries, or correspondence you send us.</li>
                <li><strong>Business Data:</strong> Restaurant concept, business model details, or operational information you voluntarily share with our consultants.</li>
              </ul>

              <h3>2.2 Information Collected Automatically</h3>
              <ul>
                <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages viewed, and time spent on our website.</li>
                <li><strong>Device Data:</strong> Device identifiers, screen resolution, and hardware model.</li>
                <li><strong>Cookie Data:</strong> Session cookies and analytics identifiers (see Section 7).</li>
              </ul>
            </section>

            <section id="data-use" className="legal-section">
              <h2>3. How We Use Your Information</h2>
              <p>We use your personal information for the following legitimate business purposes:</p>
              <ul>
                <li>To respond to your inquiries and provide our consulting services.</li>
                <li>To process and manage client engagements and project deliverables.</li>
                <li>To send service-related communications, updates, and project reports.</li>
                <li>To improve our website, services, and client experience.</li>
                <li>To comply with UAE legal and regulatory obligations.</li>
                <li>To detect and prevent fraud or misuse of our systems.</li>
              </ul>
              <div className="legal-highlight-box">
                <strong>No unsolicited marketing.</strong> We will not send you marketing communications unless you have
                expressly opted in. You may withdraw consent at any time.
              </div>
            </section>

            <section id="data-sharing" className="legal-section">
              <h2>4. Information Sharing</h2>
              <p>We do not sell, rent, or trade your personal information. We may share data only in the following circumstances:</p>
              <ul>
                <li><strong>Service Partners:</strong> With our associate partners (Mac Adz, Lawman, Pacific Hospitality &amp; Culinary Academy) as required to deliver contracted services, and only under strict confidentiality agreements.</li>
                <li><strong>Legal Compliance:</strong> When required by UAE law, court order, or governmental authority.</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of our business, subject to the acquiring party honouring this Privacy Policy.</li>
                <li><strong>With Your Consent:</strong> For any other purpose with your explicit consent.</li>
              </ul>
            </section>

            <section id="data-retention" className="legal-section">
              <h2>5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfil the purposes outlined in this
                Policy, or as required by UAE law (typically 5 years for commercial records). Project-related data may
                be retained for the duration of the contract plus 3 years for legal defensibility.
              </p>
              <p>
                You may request deletion of your data at any time, subject to any overriding legal obligations.
              </p>
            </section>

            <section id="your-rights" className="legal-section">
              <h2>6. Your Rights</h2>
              <p>Under applicable UAE data protection regulations and GDPR principles, you have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</li>
                <li><strong>Restriction:</strong> Request that we limit how we use your data.</li>
                <li><strong>Portability:</strong> Receive your data in a machine-readable format.</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
                <li><strong>Withdraw Consent:</strong> Withdraw any previously given consent at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href="mailto:privacy@littletalk.ae">privacy@littletalk.ae</a>.
                We will respond within 30 days.
              </p>
            </section>

            <section id="cookies" className="legal-section">
              <h2>7. Cookies &amp; Tracking Technologies</h2>
              <p>We use the following types of cookies:</p>
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Essential</td>
                    <td>Required for the website to function (session management)</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td>Analytics</td>
                    <td>Understand user behaviour and improve our website</td>
                    <td>Up to 2 years</td>
                  </tr>
                  <tr>
                    <td>Preference</td>
                    <td>Remember your settings and preferences</td>
                    <td>1 year</td>
                  </tr>
                </tbody>
              </table>
              <p>You can control cookies through your browser settings. Disabling analytics cookies will not affect your ability to use our services.</p>
            </section>

            <section id="security" className="legal-section">
              <h2>8. Security</h2>
              <p>
                We implement industry-standard technical and organisational security measures including SSL/TLS
                encryption, access controls, and regular security assessments. However, no method of transmission
                over the internet is 100% secure. We cannot guarantee absolute security but are committed to
                protecting your data using best practices.
              </p>
            </section>

            <section id="third-parties" className="legal-section">
              <h2>9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites, including partner portals and social media
                platforms. We are not responsible for the privacy practices of those sites and encourage you to
                review their respective privacy policies.
              </p>
            </section>

            <section id="changes" className="legal-section">
              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal
                requirements. We will notify you of material changes by posting the new policy on this page with
                an updated "Last Updated" date. We encourage you to review this page regularly.
              </p>
            </section>

            <section id="contact-legal" className="legal-section">
              <h2>11. Contact Us</h2>
              <p>If you have any questions or concerns regarding this Privacy Policy, please contact:</p>
              <div className="legal-contact-card">
                <div className="legal-contact-row">
                  <strong>Company:</strong>
                  <span>Little Talk Restaurants Management LLC</span>
                </div>
                <div className="legal-contact-row">
                  <strong>Address:</strong>
                  <span>Al Saqr Business Tower, 30th Floor, Sheikh Zayed Road, Dubai, UAE</span>
                </div>
                <div className="legal-contact-row">
                  <strong>Email:</strong>
                  <a href="mailto:privacy@littletalk.ae">privacy@littletalk.ae</a>
                </div>
                <div className="legal-contact-row">
                  <strong>Phone:</strong>
                  <a href="tel:+971585960727">+971 58 59 60 727</a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
