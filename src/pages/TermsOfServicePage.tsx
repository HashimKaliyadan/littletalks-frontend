import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.tsx';
import Breadcrumbs from '../components/Breadcrumbs.tsx';
import './LegalPage.css';

export default function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="legal-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-content">
          <Breadcrumbs />
          <h1 className="legal-hero-title">Terms of Service</h1>
          <p className="legal-hero-sub">
            Last updated: {new Date().toLocaleDateString('en-AE', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="legal-main">
        <div className="legal-container">

          {/* Body */}
          <article className="legal-body">
            <section id="acceptance" className="legal-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing our website (<strong>littletalk.ae</strong>), engaging our services, or signing any
                service agreement with Little Talk Restaurants Management LLC ("Company", "we", "us"), you ("Client")
                agree to be legally bound by these Terms of Service ("Terms").
              </p>
              <p>
                If you do not agree to these Terms, you must immediately cease use of our website and services. These
                Terms apply to all visitors, users, and clients who access or use our services.
              </p>
              <div className="legal-highlight-box">
                These Terms should be read alongside our <Link to="/privacy-policy">Privacy Policy</Link>, which is
                incorporated herein by reference.
              </div>
            </section>

            <section id="services" className="legal-section">
              <h2>2. Description of Services</h2>
              <p>
                Little Talk provides premium culinary and hospitality consulting services across the GCC, including
                but not limited to:
              </p>
              <ul>
                <li>Restaurant concept development and planning</li>
                <li>UAE legal documentation and regulatory compliance support</li>
                <li>Staff training and PHCA certification pathways</li>
                <li>Microbiological and food safety lab testing</li>
                <li>Menu engineering and preparation</li>
                <li>Business transformation, ISO compliance, and operational audits</li>
                <li>Supply of commercial hospitality equipment and products</li>
              </ul>
              <p>
                The specific scope, timeline, and deliverables for each engagement are defined in the individual
                Service Agreement or Statement of Work (SOW) executed between the parties.
              </p>
            </section>

            <section id="engagement" className="legal-section">
              <h2>3. Client Engagement</h2>
              <h3>3.1 Onboarding</h3>
              <p>
                All client engagements commence upon execution of a signed Service Agreement and receipt of any
                required upfront payment. Verbal agreements or email confirmations do not constitute binding
                contracts unless followed by a formal signed agreement.
              </p>
              <h3>3.2 Client Obligations</h3>
              <p>The Client agrees to:</p>
              <ul>
                <li>Provide accurate, complete, and timely information required for service delivery.</li>
                <li>Grant necessary access to premises, personnel, and documentation as reasonably requested.</li>
                <li>Designate a primary point of contact for communication and approvals.</li>
                <li>Review and provide feedback on deliverables within agreed timelines.</li>
              </ul>
              <h3>3.3 Delays Caused by Client</h3>
              <p>
                Any delays in service delivery attributable to the Client's failure to fulfil obligations may result
                in timeline extensions or additional fees, communicated in writing.
              </p>
            </section>

            <section id="payment" className="legal-section">
              <h2>4. Payment &amp; Fees</h2>
              <ul>
                <li><strong>Currency:</strong> All fees are quoted and payable in UAE Dirhams (AED) unless otherwise agreed.</li>
                <li><strong>Payment Schedule:</strong> As specified in the Service Agreement (typically 50% upfront, 50% on completion or milestone-based).</li>
                <li><strong>Late Payments:</strong> Invoices overdue by more than 14 days may incur a late fee of 1.5% per month on outstanding balances.</li>
                <li><strong>VAT:</strong> All fees are exclusive of UAE Value Added Tax (VAT) at the applicable rate of 5%, unless specifically stated otherwise.</li>
                <li><strong>Expenses:</strong> Pre-approved out-of-pocket expenses (travel, lab fees, regulatory filing costs) are invoiced at cost.</li>
                <li><strong>Refunds:</strong> Refunds are governed by the individual Service Agreement. As a general principle, fees for completed work are non-refundable.</li>
              </ul>
            </section>

            <section id="ip" className="legal-section">
              <h2>5. Intellectual Property</h2>
              <h3>5.1 Company IP</h3>
              <p>
                All proprietary methodologies, frameworks, training materials, templates, and tools developed by
                Little Talk remain our exclusive intellectual property. Engagement deliverables (e.g., custom menus,
                SOPs, concept documents) created for the Client become the Client's property upon receipt of full
                payment.
              </p>
              <h3>5.2 Client IP</h3>
              <p>
                All pre-existing intellectual property provided by the Client remains the Client's property. The
                Client grants us a limited licence to use such IP solely for the purpose of delivering the contracted
                services.
              </p>
              <h3>5.3 Portfolio Rights</h3>
              <p>
                We reserve the right to reference the Client's name and project type in our portfolio and marketing
                materials unless the Client requests otherwise in writing.
              </p>
            </section>

            <section id="confidentiality" className="legal-section">
              <h2>6. Confidentiality</h2>
              <p>
                Both parties agree to keep confidential all non-public information received from the other party in
                connection with the services ("Confidential Information"). This obligation survives termination of
                the engagement for a period of three (3) years.
              </p>
              <p>
                Confidential Information does not include information that is: (a) publicly available through no
                fault of the receiving party; (b) already known to the receiving party prior to disclosure; or
                (c) independently developed without reference to the disclosing party's information.
              </p>
            </section>

            <section id="disclaimers" className="legal-section">
              <h2>7. Disclaimers</h2>
              <p>
                Our services are provided "as is" and "as available". While we strive for excellence, we make no
                warranties—express or implied—regarding:
              </p>
              <ul>
                <li>The accuracy or completeness of any regulatory or legal guidance provided (which does not constitute legal advice).</li>
                <li>Specific business outcomes or financial results from implementing our recommendations.</li>
                <li>The uninterrupted availability of our website or digital services.</li>
              </ul>
              <p>
                We strongly recommend that all regulatory and legal matters be reviewed by licensed UAE legal counsel.
              </p>
            </section>

            <section id="liability" className="legal-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by UAE law, Little Talk's total cumulative liability for any claim
                arising from or related to these Terms or our services shall not exceed the total fees paid by the
                Client in the three (3) months preceding the claim.
              </p>
              <p>
                In no event shall we be liable for indirect, incidental, special, consequential, or punitive
                damages, including lost profits or lost business opportunities, even if advised of the possibility
                of such damages.
              </p>
            </section>

            <section id="indemnification" className="legal-section">
              <h2>9. Indemnification</h2>
              <p>
                The Client agrees to indemnify, defend, and hold harmless Little Talk and its officers, directors,
                employees, and partners from any claims, losses, damages, liabilities, and expenses (including
                reasonable legal fees) arising from:
              </p>
              <ul>
                <li>The Client's breach of these Terms.</li>
                <li>The Client's misuse of our deliverables or recommendations.</li>
                <li>The Client's violation of any applicable laws or regulations.</li>
                <li>Any third-party claims relating to the Client's business operations.</li>
              </ul>
            </section>

            <section id="termination" className="legal-section">
              <h2>10. Termination</h2>
              <p>
                Either party may terminate a service engagement by providing 30 days' written notice. Upon
                termination:
              </p>
              <ul>
                <li>The Client shall pay for all services rendered up to the termination date.</li>
                <li>We shall deliver all completed work product paid for by the Client.</li>
                <li>Confidentiality, IP, and indemnification provisions survive termination.</li>
              </ul>
              <p>
                We reserve the right to terminate services immediately and without notice in cases of fraudulent
                activity, non-payment exceeding 30 days, or abusive conduct toward our staff.
              </p>
            </section>

            <section id="governing-law" className="legal-section">
              <h2>11. Governing Law &amp; Dispute Resolution</h2>
              <p>
                These Terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai. Any
                disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of
                Dubai, UAE.
              </p>
              <p>
                Before initiating legal proceedings, the parties agree to attempt resolution through good-faith
                negotiation for a period of 30 days. If unresolved, either party may refer the dispute to mediation
                through the Dubai International Arbitration Centre (DIAC).
              </p>
            </section>

            <section id="changes-tos" className="legal-section">
              <h2>12. Changes to These Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Significant changes will be communicated
                via email (to active clients) or posted prominently on our website with an updated "Last Updated"
                date. Continued use of our services after changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section id="contact-tos" className="legal-section">
              <h2>13. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact our legal team:
              </p>
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
                  <a href="mailto:legal@littletalk.ae">legal@littletalk.ae</a>
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
