
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">Cookie Policy</h1>
      <Card>
        <CardHeader>
          <CardTitle>How We Use Cookies</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-lg max-w-none">
          <p>
            Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.
          </p>
          <h2>What is a cookie?</h2>
          <p>
            A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive.
          </p>
          <h2>Types of cookies we use</h2>
            <ul>
                <li><strong>Strictly necessary cookies.</strong> These are cookies that are required for the operation of our website.</li>
                <li><strong>Analytical/performance cookies.</strong> They allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it.</li>
                <li><strong>Functionality cookies.</strong> These are used to recognise you when you return to our website.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
