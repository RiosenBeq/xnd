/**
 * XND Teknoloji Grubu — JSON-LD structured data
 * Organization + WebSite on every page, BreadcrumbList per page, and
 * page-specific schemas (Service list + FAQ on /hizmetler, NewsArticle on /haber-detay).
 */

const SITE_URL = 'https://xnd.com.tr';
const ORG_NAME = 'XND Teknoloji Grubu';

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: ORG_NAME,
  alternateName: 'XND Technology Group',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/xnd.png`, width: 400, height: 121 },
  description:
    'XND Teknoloji Grubu; profesyonel ses, ışık, görüntü, IT ve network altyapılarını uçtan uca entegre eden kurumsal teknoloji grubudur.',
  slogan: 'Tüm teknolojiler, tek bir sistem.',
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
      telephone: '+90-850-241-95-75',
      email: 'iletisim@xnd.com.tr',
      areaServed: 'TR',
      availableLanguage: ['Turkish', 'English'],
    },
  ],
  sameAs: ['https://www.instagram.com/xndteknolojigrubu/'],
  knowsAbout: [
    'Profesyonel Ses Sistemleri',
    'Işık ve Sahne Sistemleri',
    'Görüntü ve LED Ekran Sistemleri',
    'Bilişim Altyapısı',
    'Network Mimarisi',
    'Sistem Entegrasyonu ve Otomasyon',
  ],
  subOrganization: [
    'Click NOW Digital',
    'On Müzik',
    'Tıkla Hemen Al',
    'XND Teknoloji',
    'NextGenLab',
    'NextGenBox',
    'On Müzik Proje',
    'Alpenga',
  ].map((name) => ({ '@type': 'Organization', name })),
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: ORG_NAME,
  inLanguage: ['tr-TR', 'en'],
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const HOME = { name: 'Anasayfa', url: '/' };
const BREADCRUMBS = {
  home: [HOME],
  about: [HOME, { name: 'Hakkımızda', url: '/hakkimizda' }],
  services: [HOME, { name: 'Hizmetler', url: '/hizmetler' }],
  brands: [HOME, { name: 'Markalarımız', url: '/marka-detay' }],
  news: [HOME, { name: 'Basın Odası', url: '/basin-odasi' }],
  'news-detail': [
    HOME,
    { name: 'Basın Odası', url: '/basin-odasi' },
    { name: 'XND Teknoloji, Yeni Veri Merkezi Yatırımını Duyurdu', url: '/haber-detay' },
  ],
  contact: [HOME, { name: 'İletişim', url: '/iletisim' }],
  career: [HOME, { name: 'Kariyer', url: '/kariyer' }],
  investors: [HOME, { name: 'Yatırımcı İlişkileri', url: '/yatirimci-iliskileri' }],
  legal: [HOME, { name: 'Yasal Bilgiler', url: '/yasal' }],
  kvkk: [HOME, { name: 'NextGenBox KVKK', url: '/kvkk' }],
};

function inject(schema, id) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
}

/** Builds Service ItemList from elements marked [data-service] (title + description). */
function serviceSchema() {
  const items = [...document.querySelectorAll('[data-service]')].map((el, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: el.querySelector('[data-service-name]')?.textContent.trim(),
      description: el.querySelector('[data-service-desc]')?.textContent.trim(),
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'TR',
    },
  }));
  return items.length ? { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items } : null;
}

/** Builds FAQPage from <details data-faq> elements (summary = question). */
function faqSchema() {
  const items = [...document.querySelectorAll('[data-faq]')].map((el) => ({
    '@type': 'Question',
    name: el.querySelector('summary')?.textContent.trim(),
    acceptedAnswer: { '@type': 'Answer', text: el.querySelector('[data-faq-answer]')?.textContent.trim() },
  }));
  return items.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items } : null;
}

const ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'XND Teknoloji, Yeni Veri Merkezi Yatırımını Duyurdu',
  description:
    "XND Teknoloji Grubu, İstanbul Silivri'de çevre dostu bir veri merkezi yatırımına başladığını duyurdu. Projenin 2027'nin ilk çeyreğinde tamamlanması öngörülüyor.",
  datePublished: '2026-03-24',
  dateModified: '2026-03-24',
  inLanguage: 'tr-TR',
  author: { '@type': 'Organization', name: ORG_NAME },
  publisher: { '@id': `${SITE_URL}/#organization` },
  image: `${SITE_URL}/images/network-corridor.webp`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/haber-detay` },
};

export function renderSchemas(page) {
  inject(ORG_SCHEMA, 'jsonld-organization');
  inject(WEBSITE_SCHEMA, 'jsonld-website');
  if (BREADCRUMBS[page]) inject(breadcrumbSchema(BREADCRUMBS[page]), 'jsonld-breadcrumb');
  if (page === 'services') {
    const services = serviceSchema();
    const faq = faqSchema();
    if (services) inject(services, 'jsonld-services');
    if (faq) inject(faq, 'jsonld-faq');
  }
  if (page === 'news-detail') inject(ARTICLE_SCHEMA, 'jsonld-article');
}
