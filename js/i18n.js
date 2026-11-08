/**
 * XND Teknoloji Grubu — i18n
 *
 * Turkish is the source language and lives directly in the HTML, so TR visitors
 * download no dictionary at all. English strings live in js/locales/en/*.js:
 * `common.js` (header, footer, shared blocks) plus one file per page, named after
 * <body data-page="...">. They are code-split and loaded only when EN is active.
 *
 * Markup contract:
 *   <h2 data-i18n="home.intro.title">…</h2>                → innerHTML is swapped
 *   <input data-i18n="contact.form.name.ph" data-i18n-attr="placeholder">
 *   Elements carrying data-i18n must not contain icons (innerHTML is replaced).
 */

const STORAGE_KEY = 'xnd_lang';
const SUPPORTED = ['tr', 'en'];
const locales = import.meta.glob('./locales/en/*.js');

const originals = new Map();
let enDict = null;

export function getLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED.includes(fromUrl)) return fromUrl;
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'tr';
  } catch {
    return 'tr';
  }
}

async function loadEnglish(page) {
  if (enDict) return enDict;
  const files = ['./locales/en/common.js', `./locales/en/${page}.js`].filter((f) => locales[f]);
  const modules = await Promise.all(files.map((f) => locales[f]()));
  enDict = Object.assign({}, ...modules.map((m) => m.default));
  return enDict;
}

function snapshotOriginals() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (originals.has(el)) return;
    const attr = el.getAttribute('data-i18n-attr');
    originals.set(el, attr ? el.getAttribute(attr) : el.tagName === 'TITLE' ? el.textContent : el.innerHTML);
  });
}

/** Small runtime dictionary for strings created by JS (validation, toasts…). */
const ui = {
  tr: {
    'lang.switch': 'Switch to English',
    'lang.label': 'EN',
    'form.required': 'Bu alan zorunludur.',
    'form.email': 'Geçerli bir e-posta adresi girin.',
    'form.contact': 'E-posta veya telefon bilgisinden en az birini girin.',
    'form.sent': 'Mesajınız WhatsApp üzerinden iletilmek üzere hazırlandı. Açılan pencereden göndermeyi tamamlayın.',
    'form.intro': 'Merhaba, web siteniz üzerinden iletişim formu doldurdum:',
    'form.name': 'Ad Soyad',
    'form.company': 'Kurum',
    'form.email.label': 'E-posta',
    'form.phone': 'Telefon',
    'form.subject': 'Konu',
    'form.message': 'Mesaj',
    'share.copied': 'Bağlantı kopyalandı',
  },
  en: {
    'lang.switch': 'Türkçe’ye geç',
    'lang.label': 'TR',
    'form.required': 'This field is required.',
    'form.email': 'Please enter a valid email address.',
    'form.contact': 'Please provide at least an email address or a phone number.',
    'form.sent': 'Your message is ready to be sent via WhatsApp. Complete sending in the window that opened.',
    'form.intro': 'Hello, I filled in the contact form on your website:',
    'form.name': 'Full name',
    'form.company': 'Company',
    'form.email.label': 'Email',
    'form.phone': 'Phone',
    'form.subject': 'Subject',
    'form.message': 'Message',
    'share.copied': 'Link copied',
  },
};

let current = 'tr';

export function t(key) {
  return ui[current]?.[key] ?? ui.tr[key] ?? key;
}

export function currentLang() {
  return current;
}

export async function applyLanguage(lang, page) {
  if (!SUPPORTED.includes(lang)) lang = 'tr';
  snapshotOriginals();

  let dict = null;
  if (lang === 'en') {
    try {
      dict = await loadEnglish(page);
    } catch {
      lang = 'tr';
    }
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    const value = dict ? dict[key] : originals.get(el);
    if (value == null) return;
    if (attr) el.setAttribute(attr, value);
    else if (el.tagName === 'TITLE') document.title = value;
    else el.innerHTML = value;
  });

  current = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', t('lang.switch'));
    const label = btn.querySelector('[data-lang-label]');
    if (label) label.textContent = t('lang.label');
  });

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — language still applies for this view */
  }
  document.documentElement.classList.remove('i18n-pending');
  window.dispatchEvent(new CustomEvent('xnd:language', { detail: { lang } }));
}
