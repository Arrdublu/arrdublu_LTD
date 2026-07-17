const fs = require('fs');
const glob = require('glob'); // Not available by default, we'll use fs and path recursively

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findFiles('src/app', /page\.tsx$/);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  
  if (content.includes('constructMetadata(')) {
    continue;
  }
  
  // Extract title and description if export const metadata: Metadata = { ... }
  const metadataRegex = /export const metadata:\s*Metadata\s*=\s*\{([\s\S]*?)\};?\n/m;
  const match = content.match(metadataRegex);
  
  if (match) {
    const block = match[1];
    let titleMatch = block.match(/title:\s*['"`](.*?)['"`],/);
    let descMatch = block.match(/description:\s*['"`](.*?)['"`],?/);
    let title = titleMatch ? titleMatch[1] : '';
    let desc = descMatch ? descMatch[1] : '';
    
    if (title || desc) {
      // make sure import { constructMetadata } is there
      if (!content.includes('constructMetadata')) {
        content = `import { constructMetadata } from '@/lib/utils';\n` + content;
      }
      
      const newMetadata = `export const metadata: Metadata = constructMetadata({\n  title: '${title.replace(/'/g, "\\'")}',\n  description: '${desc.replace(/'/g, "\\'")}',\n});\n`;
      
      content = content.replace(match[0], newMetadata);
      fs.writeFileSync(file, content, 'utf-8');
      console.log('Patched static metadata in ' + file);
    }
  } else {
    // Check for generateMetadata
    const generateRegex = /export\s+(?:async\s+)?function\s+generateMetadata\([^)]*\)(?:\s*:\s*Promise<Metadata>)?\s*\{\s*([\s\S]*?)\s*return\s*\{([\s\S]*?)\};?\s*\}/m;
    const genMatch = content.match(generateRegex);
    if (genMatch) {
       console.log('Found generateMetadata in ' + file + ' - please patch manually');
    }
  }
}
