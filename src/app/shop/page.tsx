
import { FreeDownloadsGrid } from '@/components/shop/FreeDownloadsGrid';
import { PrintsGrid } from '@/components/shop/PrintsGrid';
import { UsedEquipmentGrid } from '@/components/shop/UsedEquipmentGrid';
import { Separator } from '@/components/ui/separator';

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Shop
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Browse our collection of prints, free media assets, and quality used equipment.
        </p>
      </div>
      
      <section className="py-12">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-primary">
          Prints
        </h2>
        <PrintsGrid />
      </section>

      <Separator className="my-16" />

      <section className="py-12">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-primary">
          Used Equipment Resale
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-center text-foreground/80 mb-12">
          Quality pre-owned gear, inspected and ready for a new home.
        </p>
        <UsedEquipmentGrid />
      </section>

      <Separator className="my-16" />

      <section className="py-12">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-primary">
          Free Downloads
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-center text-foreground/80 mb-12">
          Enjoy a selection of high-quality photos and videos, free to use.
        </p>
        <FreeDownloadsGrid />
      </section>

    </div>
  );
}
