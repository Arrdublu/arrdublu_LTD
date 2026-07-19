import { getNewsletterSubscribers } from '@/lib/actions';
import NewsletterManager from '@/components/admin/NewsletterManager';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewsletterAdminPage() {
  const subscribers = await getNewsletterSubscribers();

  return (
    <div className="w-full">
      <NewsletterManager initialSubscribers={subscribers} />
    </div>
  );
}
