const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src/app/admin/page.tsx');
let content = fs.readFileSync(p, 'utf8');

content = content.replace("import { ServiceCardManager } from '@/components/admin/ServiceCardManager';\n", "");
content = content.replace("import { ProductManager } from '@/components/admin/ProductManager';\n", "");
content = content.replace(`      <div className="grid gap-6 md:grid-cols-2">
        <ServiceCardManager />
        <ProductManager />
      </div>`, "");

fs.writeFileSync(p, content);
