import { defineConfig } from 'vite';
import { resolve, join, extname } from 'path';
import fs from 'fs';

const root = __dirname;

/** Pages in the site. Key = Rollup entry name, value = HTML file. */
const pages = {
  main: 'index.html',
  hakkimizda: 'hakkimizda.html',
  hizmetler: 'hizmetler.html',
  markaDetay: 'marka-detay.html',
  basinOdasi: 'basin-odasi.html',
  haberDetay: 'haber-detay.html',
  iletisim: 'iletisim.html',
  kariyer: 'kariyer.html',
  yatirimciIliskileri: 'yatirimci-iliskileri.html',
  yasal: 'yasal.html',
  kvkk: 'kvkk.html',
  notFound: '404.html',
};

/** Pages that live under the "Kurumsal" dropdown in the header. */
const navGroups = { about: 'corporate', investors: 'corporate', career: 'corporate' };

/**
 * Static partials: `<!-- @include header -->` is replaced with partials/header.html
 * at dev and build time, so navigation and footer ship as real HTML (no JS flash,
 * crawlable links). Links whose data-nav matches <body data-page> get aria-current.
 */
function htmlPartials() {
  return {
    name: 'xnd-html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const page = (html.match(/<body[^>]*\sdata-page="([^"]+)"/) || [])[1];
        return html.replace(/<!--\s*@include\s+([\w-]+)\s*-->/g, (_, name) => {
          let partial = fs.readFileSync(join(root, 'partials', `${name}.html`), 'utf8');
          if (page) {
            partial = partial.replaceAll(`data-nav="${page}"`, `data-nav="${page}" aria-current="page"`);
            const group = navGroups[page];
            if (group) partial = partial.replaceAll(`data-nav-group="${group}"`, `data-nav-group="${group}" data-active`);
          }
          return partial;
        });
      },
    },
  };
}

/** Mirror Vercel `cleanUrls` locally: /hizmetler -> /hizmetler.html */
function cleanUrls() {
  const rewrite = (baseDir) => (req, _res, next) => {
    const [pathname, query] = req.url.split('?');
    if (pathname !== '/' && !extname(pathname)) {
      const candidate = join(baseDir, `${pathname.replace(/\/$/, '')}.html`);
      if (fs.existsSync(candidate)) {
        req.url = `${pathname.replace(/\/$/, '')}.html${query ? `?${query}` : ''}`;
      }
    }
    next();
  };
  return {
    name: 'xnd-clean-urls',
    configureServer(server) {
      server.middlewares.use(rewrite(server.config.root));
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite(resolve(server.config.root, server.config.build.outDir)));
    },
  };
}

export default defineConfig({
  plugins: [htmlPartials(), cleanUrls()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([k, f]) => [k, resolve(root, f)])),
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    assetsInlineLimit: 4096,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
