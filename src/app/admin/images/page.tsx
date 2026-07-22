import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/utils';
import WebsiteImageManager from '@/components/admin/ImageManager';

export const metadata: Metadata = constructMetadata({
  title: 'Website Images | Arrdublu Admin',
  description: 'Manage global website imagery, brand assets, and media components across the Arrdublu platform.',
  image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
});

export default function WebsiteImagesAdminPage() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <WebsiteImageManager />
    </div>
  );
}
