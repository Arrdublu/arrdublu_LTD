
import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = constructMetadata({
  title: 'Manage Free Downloads & Media Content | Arrdublu Admin',
  description: 'Content management portal for digital assets, downloadable media resources, and free downloads in the Arrdublu administration system.',
  image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
});

export default function AdminFreeDownloadsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Free Downloads</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Content Management
          </h3>
          <p className="text-sm text-muted-foreground">
            This section is under construction. Soon you'll be able to add, edit, and remove free media.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/admin">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
