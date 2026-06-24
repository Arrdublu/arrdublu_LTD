
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WhatsNewPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">What's New</h1>
      <Card>
        <CardHeader>
          <CardTitle>Latest Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Stay tuned for our latest services, projects, and announcements.</p>
        </CardContent>
      </Card>
    </div>
  );
}
