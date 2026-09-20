import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const articlesDirectory = path.join(projectRoot, 'src', 'content', 'articles');

const staticUrls = [
  ['/', '1.0'],
  ['/products', '0.9'],
  ['/products/creatine-monohydrate', '0.9'],
  ['/products/citrulline', '0.8'],
  ['/products/l-carnitine', '0.8'],
  ['/products/protein-pea-rice', '0.8'],
  ['/products/c-zinc', '0.8'],
  ['/products/b-complex', '0.8'],
  ['/articles', '0.8'],
  ['/analysis', '0.7'],
  ['/supplements', '0.7'],
  ['/knowledge', '0.7'],
  ['/knowledge/guides/married-men-health-guide', '0.7'],
  ['/about', '0.6'],
  ['/contact', '0.6'],
  ['/faq', '0.6'],
  ['/chat', '0.5']
];

const articleFiles = (await readdir(articlesDirectory))
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts');

const articleUrls = [];

for (const file of articleFiles) {
  const source = await readFile(path.join(articlesDirectory, file), 'utf8');
  const slug = source.match(/\bslug:\s*['"]([^'"]+)['"]/u)?.[1];
  const status = source.match(/\bstatus:\s*['"]([^'"]+)['"]/u)?.[1];

  if (slug && status === 'published') {
    articleUrls.push([`/articles/${slug}`, '0.8']);
  }
}

const urls = [...staticUrls, ...articleUrls];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([route, priority]) => `  <url><loc>https://www.mgrefots.com${route}</loc><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`;

await writeFile(path.join(projectRoot, 'public', 'sitemap.xml'), xml, 'utf8');

console.log(`Generated sitemap with ${urls.length} URLs (${articleUrls.length} published articles).`);
