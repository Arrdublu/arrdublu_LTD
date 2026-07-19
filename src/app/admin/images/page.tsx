import WebsiteImageManager from '@/components/admin/ImageManager';

export const metadata = {
  title: 'Website Images | Arrdublu Admin',
  description: 'Manage global website imagery',
};

export default function WebsiteImagesAdminPage() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <WebsiteImageManager />
    </div>
  );
}
