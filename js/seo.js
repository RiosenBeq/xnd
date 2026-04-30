/**
 * XND Teknoloji Grubu — Shared JSON-LD structured data
 * Injects Organization + WebSite + (optional) Breadcrumb on every page.
 */

const SITE_URL = 'https://xnd.com.tr';
const ORG_NAME = 'XND Teknoloji Grubu';
const ORG_LOGO = `${SITE_URL}/header_logo.png`;

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: ORG_NAME,
  alternateName: 'XND Technology Group',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: ORG_LOGO,
    width: 512,
    height: 512,
  },
  description:
    'XND Teknoloji Grubu; ses, ışık, görüntü, IT ve network altyapılarını uçtan uca entegre eden kurumsal teknoloji grubudur.',
  foundingDate: '2018',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cevizli Mah. Tugayyolu Cad. No:69C Piazza AVM',
    addressLocality: 'Maltepe',
    addressRegion: 'İstanbul',
    postalCode: '34846',
    addressCountry: 'TR',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@xnd.com.tr',
      areaServed: ['TR', 'EU', 'ME'],
      availableLanguage: ['Turkish', 'English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@xnd.com.tr',
      areaServed: 'TR',
      availableLanguage: ['Turkish', 'English'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/xnd-teknoloji',
    'https://www.instagram.com/xndteknoloji',
  ],
  knowsAbout: [
    'Profesyonel Ses Sistemleri',
    'Profesyonel Işık Sistemleri',
    'Görüntü ve LED Çözümleri',
    'Bilişim Altyapısı',
    'Network Mimarisi',
    'IoT Entegrasyonu',
    'Endüstriyel Otomasyon',
  ],
  subOrganization: [
    { '@type': 'Organization', name: 'Click NOW Digital' },
    { '@type': 'Organization', name: 'On Müzik' },
    { '@type': 'Organization', name: 'Tıkla Hemen Al' },
    { '@type': 'Organization', name: 'XND Tek' },
    { '@type': 'Organization', name: 'NextGenLab' },
    { '@type': 'Organization', name: 'NextGenBox' },
    { '@type': 'Organization', name: 'On Müzik Proje' },
    { '@type': 'Organization', name: 'Alpenga' },
  ],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ORG_NAME,
  inLanguage: 'tr-TR',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

function inject(schema, id) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function renderBaseSchema() {
  inject(ORG_SCHEMA, 'jsonld-organization');
  inject(WEBSITE_SCHEMA, 'jsonld-website');
}

export function renderBreadcrumb(items = []) {
  if (!items.length) return;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
  inject(schema, 'jsonld-breadcrumb');
}

export function renderArticleSchema(article) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.modified || article.date,
    author: { '@type': 'Organization', name: ORG_NAME },
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: article.image || `${SITE_URL}/hero_bg.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
  };
  inject(schema, 'jsonld-article');
}

export function renderServiceSchema(services = []) {
  if (!services.length) return;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'TR',
      },
    })),
  };
  inject(schema, 'jsonld-services');
}

export function renderFAQSchema(faqs = []) {
  if (!faqs.length) return;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  };
  inject(schema, 'jsonld-faq');
}
