
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminPrintsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Prints</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Content Management
          </h3>
          <p className="text-sm text-muted-foreground">
            This section is under construction. Soon you'll be able to add, edit, and remove prints.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/admin">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
