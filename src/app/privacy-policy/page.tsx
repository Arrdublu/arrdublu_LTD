
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">Privacy Policy</h1>
      <Card>
        <CardContent className="prose prose-lg max-w-none pt-6">
          <section id="scope-of-policy" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Scope of Policy</h2>
            <p>
              This Privacy Policy applies to the personal information collected by Arrdublu in connection with our website, services, and associated applications. It details our practices for acquiring, maintaining, using, and disclosing information.
            </p>
          </section>

          <section id="who-we-are" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Who We Are</h2>
            <p>
              Arrdublu is a forward-thinking entity committed to providing top-quality products and services. We are dedicated to maintaining the trust of our users by respecting and protecting your privacy throughout your engagement with our family of companies.
            </p>
          </section>

          <section id="types-of-information-we-collect" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Types of Information We Collect</h2>
            <p>
              We collect information that identifies, relates to, describes, or could reasonably be linked to you. This includes:
            </p>
            <ul>
              <li><strong>Identifiers:</strong> such as your name, email address, phone number, and IP address.</li>
              <li><strong>Commercial Information:</strong> including records of products or services purchased, obtained, or considered.</li>
              <li><strong>Internet or Network Activity:</strong> such as browsing history, search history, and interactions with our websites or advertisements.</li>
              <li><strong>Geolocation Data:</strong> derived from your IP address or mobile device settings.</li>
            </ul>
          </section>

          <section id="use-of-your-information-by-the-arrdublu-family-of-companies" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Use of Your Information by the Arrdublu Family of Companies</h2>
            <p>
              We use the collected information for our business and commercial purposes, including:
            </p>
            <ul>
              <li>Providing, supporting, and personalizing our services.</li>
              <li>Processing transactions and sending related information like confirmations and receipts.</li>
              <li>Communicating about promotions, upcoming events, and other news about our products and services.</li>
              <li>Auditing, research, and analysis to maintain, protect, and improve our services.</li>
            </ul>
          </section>

          <section id="sharing-your-information-with-other-entities" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Sharing Your Information with Other Entities</h2>
            <p>
              We may share your personal information with:
            </p>
            <ul>
              <li><strong>Affiliates:</strong> members of the Arrdublu family of companies.</li>
              <li><strong>Service Providers:</strong> entities processing data on our behalf for business purposes.</li>
              <li><strong>Legal Authorities:</strong> when required by law or to protect our rights and safety.</li>
              <li><strong>Business Transfers:</strong> in connection with a merger, sale of company assets, financing, or acquisition.</li>
            </ul>
          </section>

          <section id="your-control-and-choices" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Your Control and Choices</h2>
            <p>
              You have choices regarding the information we collect and how it's used:
            </p>
            <ul>
              <li><strong>Opt-Out:</strong> You may opt out of receiving promotional communications by following the instructions in those messages.</li>
              <li><strong>Cookie Controls:</strong> You can manage your cookie preferences through your browser settings.</li>
              <li><strong>Account Settings:</strong> You can update or correct your personal profile information at any time within your account settings.</li>
            </ul>
          </section>

          <section id="data-security-integrity-and-retention" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Data Security, Integrity, and Retention</h2>
            <p>
              We implement reasonable security measures designed to protect your information from unauthorized access, alteration, disclosure, or destruction. We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section id="data-transfers-storage-and-processing-globally" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Data Transfers, Storage, and Processing Globally</h2>
            <p>
              Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. By submitting your information, you agree to this transfer, storing, or processing globally, subject to appropriate safeguards.
            </p>
          </section>

          <section id="changes-to-this-privacy-policy" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy periodically. If we make material changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with more prominent notice (such as adding a statement to our homepage or sending you a notification).
            </p>
          </section>

          <section id="comments-and-questions" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Comments and Questions</h2>
            <p>
              If you have any comments or questions about this privacy policy or our privacy practices, please contact us at our <a href="/support" className="text-primary hover:underline">Support page</a>.
            </p>
          </section>

          <section id="us-resident-rights" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">US Resident Rights</h2>
            <p>
              Depending on your US state of residence (e.g., California, Virginia, Colorado), you may have specific rights regarding your personal information, including the right to know what is collected, a right to delete, a right to correct inaccurate data, and a right to opt-out of the sale or sharing of personal information.
            </p>
          </section>

          <section id="uk-eu-emea-residents-rights" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">UK, EU, & EMEA Residents Rights</h2>
            <p>
              If you are located in the European Economic Area (EEA), the UK, or EMEA region, you have rights under the GDPR and analogous laws. These include the right to access, rectify, or erase your personal data, the right to restrict or object to processing, and the right to data portability. You also have the right to lodge a complaint with your local supervisory authority.
            </p>
          </section>

          <section id="brazilian-residents-rights" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Brazilian Residents Rights</h2>
            <p>
              Under the Brazilian General Data Protection Law (LGPD), residents of Brazil have the right to confirmation of processing, access to data, correction of incomplete/inaccurate data, anonymization, blocking, or deletion of unnecessary data, data portability, and information about public/private entities with which we have shared data.
            </p>
          </section>

          <section id="definitions" className="mb-8">
            <h2 className="text-2xl font-bold mt-8 mb-4">Definitions</h2>
            <ul>
              <li><strong>Personal Information:</strong> Information that identifies, relates to, or could reasonably be linked with you or your household.</li>
              <li><strong>Processing:</strong> Any operation performed on personal data, whether or not by automated means.</li>
              <li><strong>Service Provider:</strong> A legal entity that processes information on behalf of a business.</li>
            </ul>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
