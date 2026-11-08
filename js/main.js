/**
 * XND Teknoloji Grubu — site runtime
 * Loaded on every page: icons, header behaviour, mobile sheet, language,
 * cookie consent, scroll reveal, contact form and share actions.
 */
import {
  createIcons,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  AudioLines,
  Boxes,
  Briefcase,
  Building2,
  Cable,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Clock,
  Compass,
  Cookie,
  Copy,
  Cpu,
  Database,
  Download,
  DraftingCompass,
  ExternalLink,
  Eye,
  FileText,
  FlaskConical,
  Gauge,
  Gavel,
  Globe,
  GraduationCap,
  Handshake,
  Headphones,
  House,
  Info,
  Instagram,
  Layers,
  Leaf,
  LifeBuoy,
  Lightbulb,
  Link,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Mic,
  Monitor,
  MonitorPlay,
  Music,
  Navigation,
  Network,
  Newspaper,
  PartyPopper,
  Phone,
  Puzzle,
  Quote,
  Rocket,
  Router,
  Scale,
  ScanSearch,
  Send,
  Server,
  Settings2,
  Share2,
  Shield,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Speaker,
  Tag,
  Target,
  TrendingUp,
  TriangleAlert,
  Twitter,
  Users,
  Video,
  Volume2,
  Waypoints,
  Wifi,
  Workflow,
  X,
  Zap,
} from 'lucide';
import { applyLanguage, getLang, currentLang, t } from './i18n.js';
import { renderSchemas } from './seo.js';

const page = document.body.dataset.page || 'home';

/* ── Icons ─────────────────────────────────────────────────────────────── */
createIcons({
  icons: {
    ArrowLeft, ArrowRight, ArrowUpRight, Award, AudioLines, Boxes, Briefcase, Building2, Cable,
    Calendar, Check, ChevronDown, ChevronRight, CircleCheck, CircleHelp, Clock, Compass, Cookie,
    Copy, Cpu, Database, Download, DraftingCompass, ExternalLink, Eye, FileText, FlaskConical,
    Gauge, Gavel, Globe, GraduationCap, Handshake, Headphones, House, Info, Instagram, Layers,
    Leaf, LifeBuoy, Lightbulb, Link, Linkedin, Lock, Mail, MapPin, Megaphone, Menu,
    MessageCircle, Mic, Monitor, MonitorPlay, Music, Navigation, Network, Newspaper,
    PartyPopper, Phone, Puzzle, Quote, Rocket, Router, Scale, ScanSearch, Send, Server,
    Settings2, Share2, Shield, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Speaker,
    Tag, Target, TrendingUp, TriangleAlert, Twitter, Users, Video, Volume2, Waypoints, Wifi,
    Workflow, X, Zap,
  },
  attrs: { 'aria-hidden': 'true', 'stroke-width': 1.75 },
});

/* ── Header: elevation on scroll ───────────────────────────────────────── */
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    const scrolled = window.scrollY > 8;
    header.classList.toggle('shadow-sm', scrolled);
    header.classList.toggle('border-border', scrolled);
    header.classList.toggle('border-transparent', !scrolled);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ── Dropdown (Kurumsal) ───────────────────────────────────────────────── */
document.querySelectorAll('[data-dropdown]').forEach((wrap) => {
  const trigger = wrap.querySelector('button');
  const panel = wrap.querySelector('.dropdown-panel');
  if (!trigger || !panel) return;
  let closeTimer;
  let hoverOpenedAt = 0;

  const open = () => {
    clearTimeout(closeTimer);
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    panel.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  };

  trigger.addEventListener('click', () => {
    if (panel.hidden) open();
    else if (Date.now() - hoverOpenedAt > 600) close();
  });
  wrap.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (panel.hidden) hoverOpenedAt = Date.now();
    open();
  });
  wrap.addEventListener('pointerleave', (e) => {
    if (e.pointerType === 'mouse') closeTimer = setTimeout(close, 140);
  });
  wrap.addEventListener('focusout', (e) => {
    if (!wrap.contains(e.relatedTarget)) close();
  });
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      close();
      trigger.focus();
    }
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) close();
  });
});

/* ── Mobile sheet ──────────────────────────────────────────────────────── */
const sheet = document.getElementById('mobile-menu');
const sheetOpeners = document.querySelectorAll('[data-sheet-open]');
if (sheet && typeof sheet.showModal === 'function') {
  const setExpanded = (v) => sheetOpeners.forEach((b) => b.setAttribute('aria-expanded', String(v)));
  sheetOpeners.forEach((btn) =>
    btn.addEventListener('click', () => {
      sheet.showModal();
      setExpanded(true);
    }),
  );
  sheet.querySelectorAll('[data-sheet-close]').forEach((btn) => btn.addEventListener('click', () => sheet.close()));
  sheet.addEventListener('click', (e) => {
    if (e.target === sheet) sheet.close();
  });
  sheet.addEventListener('close', () => setExpanded(false));
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && sheet.open && sheet.close());
}

/* ── Language ──────────────────────────────────────────────────────────── */
document.querySelectorAll('[data-lang-toggle]').forEach((btn) =>
  btn.addEventListener('click', async () => {
    const next = currentLang() === 'tr' ? 'en' : 'tr';
    await applyLanguage(next, page);
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next);
      history.replaceState(null, '', url);
    }
  }),
);
applyLanguage(getLang(), page);

/* ── Cookie consent ────────────────────────────────────────────────────── */
const consent = document.getElementById('cookie-consent');
if (consent) {
  let stored = null;
  try {
    stored = localStorage.getItem('xnd_cookie_consent');
  } catch {
    stored = 'unavailable';
  }
  if (!stored) {
    setTimeout(() => (consent.hidden = false), 900);
    consent.querySelectorAll('[data-cookie]').forEach((btn) =>
      btn.addEventListener('click', () => {
        try {
          localStorage.setItem('xnd_cookie_consent', btn.dataset.cookie);
        } catch {
          /* ignore */
        }
        consent.hidden = true;
      }),
    );
  }
}

/* ── Scroll reveal ─────────────────────────────────────────────────────── */
const revealables = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealables.length) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-visible'));
}

/* ── Contact form → WhatsApp ───────────────────────────────────────────── */
const form = document.getElementById('contact-form');
if (form) {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validateField = (field) => {
    const control = field.querySelector('input, textarea, select');
    const error = field.querySelector('.field-error');
    if (!control) return true;
    const value = control.value.trim();
    let message = '';
    if (control.required && !value) message = t('form.required');
    else if (control.type === 'email' && value && !emailRe.test(value)) message = t('form.email');
    if (message) {
      field.setAttribute('data-invalid', '');
      control.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = message;
      return false;
    }
    field.removeAttribute('data-invalid');
    control.removeAttribute('aria-invalid');
    return true;
  };

  form.querySelectorAll('.field').forEach((field) => {
    const control = field.querySelector('input, textarea, select');
    control?.addEventListener('blur', () => validateField(field));
    control?.addEventListener('input', () => field.hasAttribute('data-invalid') && validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('.field')];
    const valid = fields.map(validateField).every(Boolean);

    const email = form.elements.email?.value.trim();
    const phone = form.elements.phone?.value.trim();
    const contactNote = form.querySelector('[data-contact-note]');
    const hasContact = Boolean(email || phone);
    contactNote?.classList.toggle('hidden', hasContact);
    if (contactNote) contactNote.textContent = t('form.contact');

    if (!valid || !hasContact) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    const data = new FormData(form);
    const subjectSelect = form.elements.subject;
    const subjectLabel = subjectSelect?.selectedOptions?.[0]?.textContent.trim();
    const lines = [
      t('form.intro'),
      '',
      [t('form.name'), data.get('name')],
      [t('form.company'), data.get('company')],
      [t('form.email.label'), data.get('email')],
      [t('form.phone'), data.get('phone')],
      [t('form.subject'), subjectLabel],
      [t('form.message'), data.get('message')],
    ]
      .map((line) => (Array.isArray(line) ? (line[1] ? `*${line[0]}*: ${String(line[1]).trim()}` : null) : line))
      .filter((line) => line !== null);

    window.open(`https://wa.me/908502419575?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    const status = form.querySelector('[data-form-status]');
    if (status) {
      status.textContent = t('form.sent');
      status.classList.remove('hidden');
    }
  });
}

/* ── Share (news detail) ───────────────────────────────────────────────── */
document.querySelectorAll('[data-share]').forEach((el) => {
  const url = encodeURIComponent(window.location.href.split('?')[0]);
  const title = encodeURIComponent(document.title);
  const kind = el.dataset.share;
  if (kind === 'linkedin') el.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  if (kind === 'x') el.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
  if (kind === 'whatsapp') el.href = `https://wa.me/?text=${title}%20${url}`;
  if (kind === 'copy') {
    el.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href.split('?')[0]);
        const label = el.querySelector('[data-share-label]');
        if (label) {
          const previous = label.textContent;
          label.textContent = t('share.copied');
          setTimeout(() => (label.textContent = previous), 1800);
        }
      } catch {
        /* clipboard unavailable */
      }
    });
  }
});

/* ── Structured data ───────────────────────────────────────────────────── */
renderSchemas(page);
