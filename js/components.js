/**
 * XND Teknoloji Grubu — Shared Components
 * Navy + Gold Corporate Theme
 */

import { translations, getCurrentLanguage, setLanguage, initLanguage } from './i18n.js';

/**
 * Renders the global navbar + mobile bottom bar
 * @param {string} activePage - 'home' | 'about' | 'services' | 'brands' | 'career' | 'contact' | 'news'
 */
export function renderNavbar(activePage = 'home') {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  const links = [
    { id: 'home', label: 'Anasayfa', href: '/index.html', icon: 'home' },
    { id: 'about', label: 'Hakkımızda', href: '/hakkimizda.html', icon: 'info' },
    { id: 'services', label: 'Hizmetler', href: '/hizmetler.html', icon: 'build' },
    { id: 'brands', label: 'Markalar', href: '/marka-detay.html', icon: 'stars' },
    { id: 'news', label: 'Basın', href: '/basin-odasi.html', icon: 'newspaper' },
  ];

  const lang = getCurrentLanguage();
  const t = translations[lang];

  // Desktop nav links
  const linksHTML = links.map(l => {
    const isActive = l.id === activePage;
    return `
      <a data-i18n="nav.${l.id}" 
         class="font-plus-jakarta text-[10px] tracking-[0.3em] uppercase relative transition-all duration-700 py-2 group/link ${isActive ? 'text-primary font-black scale-105' : 'text-white/40 hover:text-white'}" 
         href="${l.href}">
        ${t[`nav.${l.id}`] || l.label}
        <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 group-hover/link:w-full ${isActive ? 'w-full opacity-100' : 'opacity-0'}"></span>
      </a>`;
  }).join('');

  const contactIsActive = activePage === 'contact';

  // Mobile bottom bar links (5 items max)
  const mobileLinks = [
    { id: 'home', icon: 'home', href: '/index.html' },
    { id: 'services', icon: 'category', href: '/hizmetler.html' },
    { id: 'brands', icon: 'stars', href: '/marka-detay.html' },
    { id: 'news', icon: 'newspaper', href: '/basin-odasi.html' },
    { id: 'contact', icon: 'mail', href: '/iletisim.html' },
  ];

  const mobileBarHTML = mobileLinks.map(l => {
    const isActive = l.id === activePage;
    const label = t[`nav.${l.id}`] || l.id;
    return `<a href="${l.href}" class="flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary scale-105' : 'text-white/40 hover:text-white/70'}">
      <span class="material-symbols-outlined text-xl ${isActive ? 'text-primary' : ''}">${l.icon}</span>
      <span class="text-[8px] font-bold tracking-[0.1em] uppercase">${label}</span>
      ${isActive ? '<div class="w-1 h-1 rounded-full bg-primary mt-0.5 shadow-[0_0_8px_#c9a84c]"></div>' : ''}
    </a>`;
  }).join('');

  navContainer.innerHTML = `
    <!-- ═══ Desktop Top Nav (Crystal Elite Edition) ═══ -->
    <nav class="fixed top-8 md:top-12 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-7xl z-50 bg-black/40 backdrop-blur-[60px] border border-white/[0.12] shadow-[0_40px_150px_rgba(0,0,0,1)] rounded-[3.5rem] transition-all duration-1000 hover:bg-black/60 overflow-hidden group hidden md:block">
      <!-- Sophisticated Top Shimmer -->
      <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s] animate-[goldShimmer_6s_linear_infinite] bg-[length:200%_auto]"></div>
      <!-- Multi-Layered Ambient Inner Glows -->
      <div class="absolute inset-0 bg-gradient-to-r from-primary/[0.04] via-transparent to-primary/[0.04] pointer-events-none"></div>
      <div class="absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.03)] pointer-events-none"></div>
      <div class="absolute -inset-px bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none rounded-[3.5rem]"></div>
      
      <div class="flex justify-between items-center px-12 md:px-16 py-5 md:py-6 relative z-10">
        <!-- Logo (Enlarged Elite) -->
        <a href="/index.html" class="flex-shrink-0 group/logo relative">
          <div class="absolute inset-0 bg-primary/30 blur-[40px] rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-1000"></div>
          <img src="/header_logo.png" alt="XND" class="h-14 md:h-18 w-auto object-contain relative z-10 transition-all duration-700 group-hover/logo:scale-105 group-hover/logo:brightness-125" />
        </a>

        <!-- Links -->
        <div class="hidden lg:flex gap-12 items-center justify-center flex-1 mx-12">
          ${linksHTML}
          <a data-i18n="nav.contact" class="font-plus-jakarta text-[10px] tracking-[0.3em] uppercase relative transition-all duration-700 py-2 group/link ${contactIsActive ? 'text-primary font-black scale-105' : 'text-white/40 hover:text-white font-medium'}" href="/iletisim.html">
            ${t['nav.contact']}
            <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 group-hover/link:w-full ${contactIsActive ? 'w-full opacity-100' : 'opacity-0'}"></span>
          </a>
        </div>

        <!-- Controls -->
        <div class="flex items-center space-x-6">
          <button id="langSwitcher" class="text-[10px] uppercase font-black tracking-[0.3em] text-white/40 hover:text-primary transition-all duration-500 px-5 py-2.5 rounded-2xl bg-white/[0.03] hover:bg-primary/10 border border-white/5 hover:border-primary/40 backdrop-blur-xl">
            ${lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <a data-i18n="nav.cta" href="/iletisim.html" class="btn-premium px-8 py-3.5 text-[10px] tracking-[0.25em] uppercase shadow-[0_0_40px_rgba(201,168,76,0.1)] hover:shadow-[0_0_60px_rgba(201,168,76,0.3)] rounded-full transition-all duration-500 translate-y-0 active:scale-95 whitespace-nowrap">${t['nav.cta']}</a>
        </div>
      </div>
    </nav>

    <!-- ═══ Mobile Top Bar ═══ -->
    <nav class="fixed top-0 left-0 right-0 z-50 md:hidden bg-black/40 backdrop-blur-3xl border-b border-white/[0.08]">
      <div class="flex justify-between items-center px-6 py-4">
        <a href="/index.html" class="flex-shrink-0">
          <img src="/header_logo.png" alt="XND" class="h-10 w-auto object-contain" />
        </a>
        <div class="flex items-center gap-4">
          <button id="langSwitcherMobile" class="text-[10px] uppercase font-bold tracking-widest text-white/40 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
            ${lang === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </div>
    </nav>

    <!-- ═══ Mobile Bottom Sticky Nav ═══ -->
    <nav id="mobileBottomNav" class="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/60 backdrop-blur-3xl border-t border-white/[0.08] shadow-[0_-15px_40px_rgba(0,0,0,0.8)] pb-safe">
      <div class="flex justify-around items-center px-4 py-4 max-w-md mx-auto">
        ${mobileBarHTML}
      </div>
    </nav>
  `;

  // Lang switcher handlers
  const switchLang = () => {
    const newLang = getCurrentLanguage() === 'tr' ? 'en' : 'tr';
    setLanguage(newLang);
    renderNavbar(activePage);
    renderFooter();
  };
  document.getElementById('langSwitcher')?.addEventListener('click', switchLang);
  document.getElementById('langSwitcherMobile')?.addEventListener('click', switchLang);
}

/**
 * Renders the global footer
 */
export function renderFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="relative w-full border-t border-white/[0.08] bg-[#040810] pb-20 md:pb-0">
      <div class="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <h3 class="text-2xl md:text-4xl font-black text-white mb-4">XND Teknoloji Grubu</h3>
        <p class="text-primary font-bold mb-4">Tüm teknolojiler, tek bir sistem.</p>
        <p class="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-3xl">
          XND Teknoloji Grubu, teknolojiyi kurmaz. Onu bağlar, entegre eder ve kusursuz şekilde çalıştırır.
        </p>
      </div>
    </footer>
  `;
}

/**
 * Initialize scroll reveal animations
 */
export function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('active');
          entry.target.querySelectorAll('.reveal-child').forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('active');
            }, index * 150);
          });
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Renders cookie consent banner
 */
export function renderCookieConsent() {
  if (localStorage.getItem('xnd_cookie_consent')) return;

  const lang = getCurrentLanguage();
  const t = translations[lang];

  const banner = document.createElement('div');
  banner.id = 'cookieConsent';
  banner.className = 'fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-2xl z-[100] opacity-0 translate-y-8 transition-all duration-700';
  banner.innerHTML = `
    <div class="bg-[#0a0f1a]/80 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-2xl p-5 md:p-7 flex flex-col md:flex-row items-center gap-5">
      <div class="flex items-start gap-3 flex-1">
        <span class="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">cookie</span>
        <div>
          <p class="text-white text-sm leading-relaxed">${t['cookie.message']}
            <a href="/yasal.html#cookies" class="text-primary hover:underline font-bold ml-1">${t['cookie.link']}</a>
          </p>
        </div>
      </div>
      <div class="flex gap-3 flex-shrink-0 w-full md:w-auto">
        <button id="cookieReject" class="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/50 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-300">
          ${t['cookie.reject']}
        </button>
        <button id="cookieAccept" class="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-[10px] md:text-xs uppercase tracking-widest font-bold bg-primary text-[#080c14] hover:bg-primary/85 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
          ${t['cookie.accept']}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      banner.style.opacity = '1';
      banner.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  const dismiss = (consent) => {
    localStorage.setItem('xnd_cookie_consent', consent);
    banner.style.opacity = '0';
    banner.style.transform = 'translateX(-50%) translateY(2rem)';
    setTimeout(() => banner.remove(), 700);
  };

  document.getElementById('cookieAccept')?.addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookieReject')?.addEventListener('click', () => dismiss('rejected'));
}
