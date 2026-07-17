import { constructMetadata } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Terms & Conditions | Arrdublu',
  description: 'Read Arrdublu\'s Terms and Conditions.',
});

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Please review the following terms that govern your use of the Arrdublu platform, services, and digital products.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="hidden md:block col-span-1">
          <div className="sticky top-24 bg-slate-950/60 border border-slate-800 rounded-xl p-6">
            <h3 className="font-headline text-lg font-semibold text-white mb-4">Table of Contents</h3>
            <ul className="space-y-3 text-sm font-sans text-slate-400">
              <li><a href="#introduction" className="hover:text-cyan-400 transition-colors">1. Introduction</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">2. Services</a></li>
              <li><a href="#media" className="hover:text-cyan-400 transition-colors">3. Media Rights</a></li>
              <li><a href="#ip" className="hover:text-cyan-400 transition-colors">4. Intellectual Property</a></li>
              <li><a href="#responsibilities" className="hover:text-cyan-400 transition-colors">5. User Responsibilities</a></li>
              <li><a href="#payment" className="hover:text-cyan-400 transition-colors">6. Payment</a></li>
              <li><a href="#refund" className="hover:text-cyan-400 transition-colors">7. Refund Policy</a></li>
              <li><a href="#liability" className="hover:text-cyan-400 transition-colors">8. Liability</a></li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <Card className="bg-slate-950/40 border-slate-800 backdrop-blur-sm shadow-xl">
            <CardHeader className="border-b border-slate-800/50 pb-6">
              <CardTitle className="text-2xl font-headline text-white">General Terms of Service</CardTitle>
              <p className="text-xs text-slate-500 font-mono mt-2">LAST UPDATED: JULY 2026</p>
            </CardHeader>
            <CardContent className="prose prose-invert prose-lg max-w-none pt-8">
               <h2 id="introduction" className="text-cyan-400 font-headline mt-0">1. Introduction</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">Welcome to Arrdublu. These are our terms and conditions for use of the services, which you may access in several ways, including but not limited to the World Wide Web via arrdublu.us. By using our services, you agree to be bound by these terms.</p>
                
                <h2 id="services" className="text-cyan-400 font-headline">2. Services</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">Our services are provided on an "as is" and "as available" basis. We do not guarantee that the services will be error-free or uninterrupted. We reserve the right to modify, suspend or discontinue any part of the services without notice.</p>
                
                <h2 id="media" className="text-cyan-400 font-headline">3. Media Rights and Usage</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">For services that involve the creation of media (including but not limited to photography, videography, and any accompanying sound or music), you grant Arrdublu a perpetual, worldwide, royalty-free license to use, reproduce, modify, display, and distribute the resulting media for our promotional and commercial purposes. This includes, but is not limited to, use on our website, all social media platforms (e.g., Instagram, Facebook, TikTok, Vimeo), and any monetized channels. We will make a reasonable effort to notify you when your project is featured. If you wish to opt-out or require a specific release form, please contact us prior to the commencement of the project to discuss alternative arrangements.</p>
                
                <h2 id="ip" className="text-cyan-400 font-headline">4. Intellectual Property</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">All content, including but not limited to text, graphics, logos, and service marks, is the property of Arrdublu and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content from our services without our prior written permission.</p>
                
                <h2 id="responsibilities" className="text-cyan-400 font-headline">5. User Responsibilities</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">You agree to use our services for lawful purposes only. You are responsible for any content you provide and for ensuring that it does not infringe on the rights of any third party. You agree not to disrupt or interfere with the security or accessibility of the services.</p>
                
                <h2 id="payment" className="text-cyan-400 font-headline">6. Payment</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">All services must be paid for in advance unless otherwise agreed in writing. Prices for our services are subject to change without notice. We are not responsible for any fees charged by your bank or credit card company.</p>
                
                <h2 id="refund" className="text-cyan-400 font-headline">7. Refund Policy</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">Due to the nature of our digital services, we do not offer refunds once work has commenced. Client satisfaction is our priority, and we will make reasonable efforts to resolve any issues. Please refer to our <a href="/faq" className="text-cyan-500 hover:text-cyan-300">FAQ</a> for more details.</p>
                
                <h2 id="liability" className="text-cyan-400 font-headline">8. Limitation of Liability</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">In no event shall Arrdublu, its directors, or employees be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.</p>
                
                <h2 id="governing-law" className="text-cyan-400 font-headline">9. Governing Law</h2>
                <p className="text-slate-300 font-sans font-light leading-relaxed">These Terms & Conditions shall be governed and construed in accordance with the laws of the State of Florida, United States, and the country of Jamaica, without regard to their conflict of law provisions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
