
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsRigAgentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">Terms & Conditions for ARRDUBLU™ Rig/agent</h1>
      <Card>
        <CardHeader>
          <CardTitle>Rig/Agent Usage Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none [&>h2]:mt-2">
          <h2>1. Grant of License</h2>
          <p>
            Subject to your compliance with these Terms, Arrdublu grants you a limited, non-exclusive, non-transferable, non-sublicensable license to use the ARRDUBLU™ Rig/agent (the “Rig/Agent”) solely for your internal business operations.
          </p>
          <h2>2. Restrictions</h2>
          <p>
            You agree not to: (a) decompile, reverse engineer, disassemble, or otherwise attempt to derive the source code for the Rig/Agent; (b) redistribute, encumber, sell, rent, lease, sublicense, or otherwise transfer rights to the Rig/Agent; (c) use the Rig/Agent in any manner that could damage, disable, overburden, or impair our servers or networks.
          </p>
          <h2>3. Data and Privacy</h2>
          <p>
            The Rig/Agent may collect data related to your use of our services to improve its performance and our service offerings. This data will be handled in accordance with our Privacy Policy. The Rig/Agent will not access, store, or transmit your personal or sensitive data without your explicit consent.
          </p>
          <h2>4. Disclaimer of Warranties</h2>
          <p>
            The Rig/Agent is provided "as is" and "as available" without any warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
           <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall Arrdublu be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, resulting from the use or the inability to use the Rig/Agent.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
