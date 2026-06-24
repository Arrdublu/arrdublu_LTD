
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModernSlaveryActPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">Modern Slavery Act Statement</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Stance Against Modern Slavery</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <p>
            Arrdublu is committed to preventing acts of modern slavery and human trafficking from occurring within its business and supply chain, and imposes the same high standards on its contractors, suppliers and other business partners.
          </p>
          <p>
            [Placeholder for the full Modern Slavery Act Statement. This section would detail the steps the organization is taking to ensure that slavery and human trafficking are not taking place in any of its supply chains or in any part of its own business.]
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
