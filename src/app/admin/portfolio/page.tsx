import { getPortfolioItems, getInlineEditMode } from '@/lib/portfolio-actions';
import { PortfolioList } from '@/components/admin/PortfolioList';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const items = await getPortfolioItems();
  const inlineEditMode = await getInlineEditMode();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Manage Portfolio / Case Studies</h1>
      </div>
      
      <PortfolioList initialItems={items} initialInlineEditMode={inlineEditMode} />
    </div>
  );
}
