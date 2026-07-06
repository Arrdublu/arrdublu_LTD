import { LogoManager } from '@/components/admin/LogoManager';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Client Logos | Admin',
};

export default function AdminLogosPage() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <LogoManager />
    </div>
  );
}
