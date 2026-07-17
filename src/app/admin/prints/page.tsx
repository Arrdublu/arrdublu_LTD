import { constructMetadata } from '@/lib/utils';
import { PrintsManager } from '@/components/admin/PrintsManager';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Manage Prints | Admin',
  description: '',
});

export default function AdminPrintsPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <PrintsManager />
    </div>
  );
}
