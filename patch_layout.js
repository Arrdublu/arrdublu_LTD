const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src/app/admin/layout.tsx');
let content = fs.readFileSync(p, 'utf8');

const search = `<Link
                href="/admin/services"`;
                
const replace = `<Link
                href="/admin/portfolio"
                aria-label="Manage Portfolio"
                className={\`flex items-center gap-3 rounded-lg px-3 py-2 transition-all \${
                  pathname === '/admin/portfolio'
                    ? 'text-cyan-400 bg-slate-900/80 border-l-2 border-cyan-500'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50'
                }\`}
              >
                Portfolio
              </Link>
              <Link
                href="/admin/services"`;

if (!content.includes('/admin/portfolio')) {
  content = content.replace(search, replace);
  fs.writeFileSync(p, content);
}
