
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">Terms & Conditions</h1>
      <Card>
        <CardHeader>
          <CardTitle>General Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
           <h2>1. Introduction</h2>
            <p>Welcome to Arrdublu. These are our terms and conditions for use of the services, which you may access in several ways, including but not limited to the World Wide Web via arrdublu.us. By using our services, you agree to be bound by these terms.</p>
            
            <h2>2. Services</h2>
            <p>Our services are provided on an "as is" and "as available" basis. We do not guarantee that the services will be error-free or uninterrupted. We reserve the right to modify, suspend or discontinue any part of the services without notice.</p>
            
            <h2>3. Media Rights and Usage</h2>
            <p>For services that involve the creation of media (including but not limited to photography, videography, and any accompanying sound or music), you grant Arrdublu a perpetual, worldwide, royalty-free license to use, reproduce, modify, display, and distribute the resulting media for our promotional and commercial purposes. This includes, but is not limited to, use on our website, all social media platforms (e.g., Instagram, Facebook, TikTok, Vimeo), and any monetized channels. We will make a reasonable effort to notify you when your project is featured. If you wish to opt-out or require a specific release form, please contact us prior to the commencement of the project to discuss alternative arrangements.</p>

            <h2>4. Intellectual Property</h2>
            <p>All content, including but not limited to text, graphics, logos, and service marks, is the property of Arrdublu and is protected by copyright and other intellectual property laws. You may not use, reproduce, or distribute any content from our services without our prior written permission.</p>

            <h2>5. User Responsibilities</h2>
            <p>You agree to use our services for lawful purposes only. You are responsible for any content you provide and for ensuring that it does not infringe on the rights of any third party. You agree not to disrupt or interfere with the security or accessibility of the services.</p>

            <h2>6. Payment</h2>
            <p>All services must be paid for in advance unless otherwise agreed in writing. Prices for our services are subject to change without notice. We are not responsible for any fees charged by your bank or credit card company.</p>

            <h2>7. Refund Policy</h2>
            <p>Due to the nature of our digital services, we do not offer refunds once work has commenced. Client satisfaction is our priority, and we will make reasonable efforts to resolve any issues. Please refer to our <a href="/faq">FAQ</a> for more details.</p>

            <h2>8. Limitation of Liability</h2>
            <p>In no event shall Arrdublu, its directors, or employees be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services.</p>

            <h2>9. Governing Law</h2>
            <p>These Terms & Conditions shall be governed and construed in accordance with the laws of the State of Florida, United States, and the country of Jamaica, without regard to their conflict of law provisions.</p>
        </CardContent>
      </Card>
    </div>
  );
}
