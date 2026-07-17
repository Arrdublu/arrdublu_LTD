import { constructMetadata } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy | Arrdublu',
  description: 'Learn how Arrdublu collects, uses, and protects your personal information.',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Learn how Arrdublu collects, uses, and protects your personal information across our services.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="hidden md:block col-span-1">
          <div className="sticky top-24 bg-slate-950/60 border border-slate-800 rounded-xl p-6">
            <h3 className="font-headline text-lg font-semibold text-white mb-4">Contents</h3>
            <ul className="space-y-3 text-sm font-sans text-slate-400">
              <li><a href="#who-we-are" className="hover:text-cyan-400 transition-colors">1. Who We Are</a></li>
              <li><a href="#types" className="hover:text-cyan-400 transition-colors">2. Info We Collect</a></li>
              <li><a href="#use" className="hover:text-cyan-400 transition-colors">3. Use of Information</a></li>
              <li><a href="#sharing" className="hover:text-cyan-400 transition-colors">4. Sharing Info</a></li>
              <li><a href="#control" className="hover:text-cyan-400 transition-colors">5. Your Control</a></li>
              <li><a href="#security" className="hover:text-cyan-400 transition-colors">6. Data Security</a></li>
              <li><a href="#global" className="hover:text-cyan-400 transition-colors">7. Global Transfer</a></li>
              <li><a href="#rights" className="hover:text-cyan-400 transition-colors">8. User Rights</a></li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <Card className="bg-slate-950/40 border-slate-800 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-slate-800/50 pb-6">
              <CardTitle className="text-2xl font-headline text-white">Global Privacy Policy</CardTitle>
              <p className="text-xs text-slate-500 font-mono mt-2">LAST UPDATED: JULY 2026</p>
            </CardHeader>
            <CardContent className="prose prose-invert prose-lg max-w-none pt-8">
               <p className="text-slate-300 font-sans font-light leading-relaxed">This Global Privacy Policy describes how the Arrdublu family of companies collects, uses, and discloses your personal information. It applies to all of our brands, products, services, and websites. By using our services, you consent to the data practices described in this policy.</p>
                
               <h2 id="who-we-are" className="text-cyan-400 font-headline">1. Who We Are</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">Arrdublu is a forward-thinking entity committed to providing top-quality products and services. We are dedicated to maintaining the trust of our users by respecting and protecting your privacy throughout your engagement with our family of companies.</p>
                
               <h2 id="types" className="text-cyan-400 font-headline">2. Types of Information We Collect</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">We collect information that identifies, relates to, describes, or could reasonably be linked to you. This includes:</p>
                <ul className="text-slate-300 font-sans font-light leading-relaxed list-disc list-inside">
                  <li><strong>Identifiers:</strong> such as your name, email address, phone number, and IP address.</li>
                  <li><strong>Commercial Information:</strong> including records of products or services purchased, obtained, or considered.</li>
                  <li><strong>Internet or Network Activity:</strong> such as browsing history, search history, and interactions with our websites or advertisements.</li>
                  <li><strong>Geolocation Data:</strong> derived from your IP address or mobile device settings.</li>
                </ul>
                
               <h2 id="use" className="text-cyan-400 font-headline">3. Use of Your Information</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">We use the collected information for our business and commercial purposes, including:</p>
                <ul className="text-slate-300 font-sans font-light leading-relaxed list-disc list-inside">
                  <li>Providing, supporting, and personalizing our services.</li>
                  <li>Processing transactions and sending related information like confirmations and receipts.</li>
                  <li>Communicating about promotions, upcoming events, and other news about our products and services.</li>
                  <li>Auditing, research, and analysis to maintain, protect, and improve our services.</li>
                </ul>
                
               <h2 id="sharing" className="text-cyan-400 font-headline">4. Sharing Your Information</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">We may share your personal information with:</p>
                <ul className="text-slate-300 font-sans font-light leading-relaxed list-disc list-inside">
                  <li><strong>Affiliates:</strong> members of the Arrdublu family of companies.</li>
                  <li><strong>Service Providers:</strong> entities processing data on our behalf for business purposes.</li>
                  <li><strong>Legal Authorities:</strong> when required by law or to protect our rights and safety.</li>
                  <li><strong>Business Transfers:</strong> in connection with a merger, sale of company assets, financing, or acquisition.</li>
                </ul>
                
               <h2 id="control" className="text-cyan-400 font-headline">5. Your Control and Choices</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">You have choices regarding the information we collect and how it's used:</p>
                <ul className="text-slate-300 font-sans font-light leading-relaxed list-disc list-inside">
                  <li><strong>Opt-Out:</strong> You may opt out of receiving promotional communications by following the instructions in those messages.</li>
                  <li><strong>Cookie Controls:</strong> You can manage your cookie preferences through your browser settings.</li>
                  <li><strong>Account Settings:</strong> You can update or correct your personal profile information at any time within your account settings.</li>
                </ul>
                
               <h2 id="security" className="text-cyan-400 font-headline">6. Data Security and Retention</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">We implement reasonable security measures designed to protect your information from unauthorized access, alteration, disclosure, or destruction. We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
                
               <h2 id="global" className="text-cyan-400 font-headline">7. Data Transfers Globally</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. By submitting your information, you agree to this transfer, storing, or processing globally, subject to appropriate safeguards.</p>
                
               <h2 id="rights" className="text-cyan-400 font-headline">8. Global User Rights</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">Depending on your residence (e.g., US states, UK, EU, Brazil), you may have specific rights regarding your personal information, including the right to know what is collected, a right to delete, a right to correct inaccurate data, a right to data portability, and a right to opt-out of the sale or sharing of personal information.</p>
                <p className="text-slate-300 font-sans font-light leading-relaxed mt-4">If you have any comments or questions about this privacy policy, please contact us at our <a href="/support" className="text-cyan-500 hover:text-cyan-400">Support page</a>.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
