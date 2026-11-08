/**
 * Verifies that every data-i18n key used in the HTML pages (and the partials they
 * include) has an English translation in js/locales/en/common.js or the page's own
 * locale file (named after <body data-page>). Run: npm run check:i18n
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const load = async (file) => {
  const full = path.join(root, 'js/locales/en', file);
  return fs.existsSync(full) ? (await import(pathToFileURL(full).href)).default : null;
};

const common = await load('common.js');
const keysIn = (html) => [...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]);
const partial = (name) => fs.readFileSync(path.join(root, 'partials', `${name}.html`), 'utf8');

let failed = false;
for (const file of fs.readdirSync(root).filter((f) => f.endsWith('.html'))) {
  let html = fs.readFileSync(path.join(root, file), 'utf8');
  html = html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, n) => partial(n));
  const page = (html.match(/<body[^>]*\sdata-page="([^"]+)"/) || [])[1];
  if (!page) {
    console.log(`✗ ${file}: missing <body data-page>`);
    failed = true;
    continue;
  }
  const dict = { ...common, ...((await load(`${page}.js`)) || {}) };
  const missing = [...new Set(keysIn(html))].filter((k) => !(k in dict));
  if (missing.length) {
    failed = true;
    console.log(`✗ ${file} (${page}): ${missing.length} missing → ${missing.join(', ')}`);
  } else {
    console.log(`✓ ${file} (${page})`);
  }
}
process.exit(failed ? 1 : 0);
