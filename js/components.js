/**
 * XND Teknoloji Grubu — Shared Components
 * Navy + Gold Corporate Theme — Mobile-first
 */

import { translations, getCurrentLanguage, setLanguage, initLanguage } from './i18n.js';

/**
 * Renders the global navbar + mobile bottom bar
 * @param {string} activePage
 */
export function renderNavbar(activePage = 'home') {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  const links = [
    { id: 'home', href: '/index.html', icon: 'home' },
    { id: 'about', href: '/hakkimizda.html', icon: 'info' },
    { id: 'services', href: '/hizmetler.html', icon: 'build' },
    { id: 'brands', href: '/marka-detay.html', icon: 'stars' },
    { id: 'news', href: '/basin-odasi.html', icon: 'newspaper' },
    { id: 'career', href: '/kariyer.html', icon: 'work' },
    { id: 'investors', href: '/yatirimci-iliskileri.html', icon: 'trending_up' },
  ];

  const lang = getCurrentLanguage();
  const t = translations[lang];

  // Desktop nav links
  const linksHTML = links.map(l => {
    const isActive = l.id === activePage;
    return `
      <a data-i18n="nav.${l.id}"
         aria-current="${isActive ? 'page' : 'false'}"
         class="font-plus-jakarta text-[10px] tracking-[0.3em] uppercase relative transition-all duration-700 py-2 group/link ${isActive ? 'text-primary font-black scale-105' : 'text-white/45 hover:text-white'}"
         href="${l.href}">
        ${t[`nav.${l.id}`] || l.id}
        <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 group-hover/link:w-full ${isActive ? 'w-full opacity-100' : 'opacity-0'}"></span>
      </a>`;
  }).join('');

  const contactIsActive = activePage === 'contact';

  // Mobile drawer links (full menu)
  const drawerHTML = [...links, { id: 'contact', href: '/iletisim.html', icon: 'mail' }].map(l => {
    const isActive = l.id === activePage;
    return `<a href="${l.href}" data-i18n="nav.${l.id}"
       class="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary/10 border border-primary/30 text-primary' : 'border border-white/5 text-white/80 hover:bg-white/5 hover:border-white/15'}">
       <span class="material-symbols-outlined text-2xl">${l.icon}</span>
       <span class="font-bold tracking-wider text-sm">${t[`nav.${l.id}`] || l.id}</span>
    </a>`;
  }).join('');

  // Mobile bottom bar (5 most-used)
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
    return `<a href="${l.href}" aria-label="${label}"
              class="flex flex-col items-center gap-1 transition-all duration-300 min-h-[44px] min-w-[44px] justify-center px-2 ${isActive ? 'text-primary scale-105' : 'text-white/40 hover:text-white/70'}">
      <span class="material-symbols-outlined text-xl ${isActive ? 'text-primary' : ''}">${l.icon}</span>
      <span class="text-[8px] font-bold tracking-[0.1em] uppercase">${label}</span>
      ${isActive ? '<div class="w-1 h-1 rounded-full bg-primary mt-0.5 shadow-[0_0_8px_#c9a84c]"></div>' : ''}
    </a>`;
  }).join('');

  navContainer.innerHTML = `
    <a href="#main-content" class="skip-link">İçeriğe Atla</a>

    <!-- ═══ Desktop Top Nav ═══ -->
    <nav role="navigation" aria-label="Ana Menü"
         class="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl z-50 bg-black/45 backdrop-blur-[60px] border border-white/[0.12] shadow-[0_25px_80px_rgba(0,0,0,0.7)] rounded-3xl md:rounded-[3rem] transition-all duration-1000 hover:bg-black/60 overflow-hidden group hidden md:block">
      <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s]"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary/[0.04] via-transparent to-primary/[0.04] pointer-events-none"></div>

      <div class="flex justify-between items-center px-8 lg:px-12 py-4 lg:py-5 relative z-10 gap-6">
        <a href="/index.html" class="flex-shrink-0 group/logo relative" aria-label="XND Anasayfa">
          <div class="absolute inset-0 bg-primary/30 blur-[40px] rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-1000"></div>
          <img src="/header_logo.png" alt="XND Teknoloji Grubu Logo" width="160" height="56"
               class="h-10 lg:h-14 w-auto object-contain relative z-10 transition-all duration-700 group-hover/logo:scale-105 group-hover/logo:brightness-125" />
        </a>

        <div class="hidden lg:flex gap-8 xl:gap-10 items-center justify-center flex-1">
          ${linksHTML}
          <a data-i18n="nav.contact"
             aria-current="${contactIsActive ? 'page' : 'false'}"
             class="font-plus-jakarta text-[10px] tracking-[0.3em] uppercase relative transition-all duration-700 py-2 group/link ${contactIsActive ? 'text-primary font-black scale-105' : 'text-white/45 hover:text-white font-medium'}" href="/iletisim.html">
            ${t['nav.contact']}
            <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 group-hover/link:w-full ${contactIsActive ? 'w-full opacity-100' : 'opacity-0'}"></span>
          </a>
        </div>

        <div class="flex items-center space-x-3 lg:space-x-5">
          <button id="langSwitcher" aria-label="Dil değiştir"
                  class="text-[10px] uppercase font-black tracking-[0.3em] text-white/60 hover:text-primary transition-all duration-500 px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-primary/10 border border-white/10 hover:border-primary/40 backdrop-blur-xl">
            ${lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <a data-i18n="nav.cta" href="/iletisim.html" class="btn-premium px-6 py-3 text-[10px] tracking-[0.25em] rounded-full whitespace-nowrap">${t['nav.cta']}</a>
        </div>
      </div>
    </nav>

    <!-- ═══ Mobile Top Bar ═══ -->
    <nav role="navigation" aria-label="Mobil Menü"
         class="fixed top-0 left-0 right-0 z-50 md:hidden bg-black/55 backdrop-blur-3xl border-b border-white/[0.08]">
      <div class="flex justify-between items-center px-4 py-3">
        <a href="/index.html" class="flex-shrink-0" aria-label="XND Anasayfa">
          <img src="/header_logo.png" alt="XND Logo" width="120" height="40" class="h-9 w-auto object-contain" />
        </a>
        <div class="flex items-center gap-2">
          <button id="langSwitcherMobile" aria-label="Dil değiştir"
                  class="text-[10px] uppercase font-bold tracking-widest text-white/60 bg-white/5 px-3 py-2 rounded-xl border border-white/10 min-h-[40px] min-w-[44px]">
            ${lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <button id="mobileMenuToggle" aria-label="Menüyü Aç"
                  class="text-white/80 bg-white/5 p-2 rounded-xl border border-white/10 min-h-[40px] min-w-[40px] flex items-center justify-center">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div id="mobileDrawer" class="fixed inset-0 z-[60] md:hidden bg-black/85 backdrop-blur-2xl opacity-0 pointer-events-none transition-opacity duration-500">
      <div class="absolute top-0 right-0 w-[88%] max-w-sm h-full bg-[#0a0f1a] border-l border-white/10 p-6 pt-20 overflow-y-auto translate-x-full transition-transform duration-500" id="drawerPanel">
        <button id="mobileMenuClose" aria-label="Menüyü Kapat"
                class="absolute top-4 right-4 text-white/70 bg-white/5 p-2 rounded-xl border border-white/10 min-h-[40px] min-w-[40px] flex items-center justify-center">
          <span class="material-symbols-outlined">close</span>
        </button>
        <p class="section-label mb-6">Menü</p>
        <nav class="flex flex-col gap-2" aria-label="Mobil tüm menü">${drawerHTML}</nav>
        <div class="mt-8 pt-6 border-t border-white/10">
          <a href="/iletisim.html" class="btn-premium w-full px-6 py-4 text-[11px] tracking-[0.25em] rounded-full">${t['nav.cta']}</a>
        </div>
      </div>
    </div>

    <!-- ═══ Mobile Bottom Sticky Nav ═══ -->
    <nav id="mobileBottomNav" role="navigation" aria-label="Mobil Alt Menü"
         class="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/70 backdrop-blur-3xl border-t border-white/[0.08] shadow-[0_-15px_40px_rgba(0,0,0,0.8)] pb-safe">
      <div class="flex justify-around items-center px-2 py-2 max-w-md mx-auto">
        ${mobileBarHTML}
      </div>
    </nav>
  `;

  const switchLang = () => {
    const newLang = getCurrentLanguage() === 'tr' ? 'en' : 'tr';
    setLanguage(newLang);
    renderNavbar(activePage);
    renderFooter();
  };
  document.getElementById('langSwitcher')?.addEventListener('click', switchLang);
  document.getElementById('langSwitcherMobile')?.addEventListener('click', switchLang);

  // Mobile drawer
  const drawer = document.getElementById('mobileDrawer');
  const panel = document.getElementById('drawerPanel');
  const openMenu = () => {
    drawer.style.opacity = '1';
    drawer.style.pointerEvents = 'auto';
    panel.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    drawer.style.opacity = '0';
    drawer.style.pointerEvents = 'none';
    panel.style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
  };
  document.getElementById('mobileMenuToggle')?.addEventListener('click', openMenu);
  document.getElementById('mobileMenuClose')?.addEventListener('click', closeMenu);
  drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeMenu(); });
}

/**
 * Renders the global footer (rich, multi-column)
 */
export function renderFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  const lang = getCurrentLanguage();
  const t = translations[lang];

  footerContainer.innerHTML = `
    <footer role="contentinfo" class="relative w-full border-t border-white/[0.08] bg-[#040810] pb-24 md:pb-0">
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        <!-- Brand -->
        <div class="md:col-span-4">
          <a href="/index.html" class="inline-block mb-5" aria-label="XND Anasayfa">
            <img src="/header_logo.png" alt="XND Teknoloji Grubu" width="180" height="60" class="h-12 w-auto object-contain" />
          </a>
          <p class="text-primary font-bold mb-4 text-sm tracking-wide">Tüm teknolojiler, tek bir sistem.</p>
          <p class="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
            ${t['footer.desc'] || 'XND Teknoloji Grubu, ses, ışık, görüntü ve bilişim altyapılarını uçtan uca entegre eder.'}
          </p>
          <div class="flex items-center gap-3">
            <a href="https://www.linkedin.com/company/xnd-teknoloji" rel="noopener" target="_blank" aria-label="LinkedIn" class="w-10 h-10 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center text-white/70 hover:text-primary transition-all">
              <span class="material-symbols-outlined text-lg">work</span>
            </a>
            <a href="https://www.instagram.com/xndteknoloji" rel="noopener" target="_blank" aria-label="Instagram" class="w-10 h-10 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center text-white/70 hover:text-primary transition-all">
              <span class="material-symbols-outlined text-lg">photo_camera</span>
            </a>
            <a href="mailto:info@xnd.com.tr" aria-label="E-posta" class="w-10 h-10 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 flex items-center justify-center text-white/70 hover:text-primary transition-all">
              <span class="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-2">
          <h4 class="text-white font-bold text-sm tracking-widest uppercase mb-5">${t['footer.quick_links'] || 'Hızlı Bağlantılar'}</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="/hakkimizda.html" class="text-on-surface-variant hover:text-primary transition-colors">${t['nav.about']}</a></li>
            <li><a href="/hizmetler.html" class="text-on-surface-variant hover:text-primary transition-colors">${t['nav.services']}</a></li>
            <li><a href="/marka-detay.html" class="text-on-surface-variant hover:text-primary transition-colors">${t['nav.brands']}</a></li>
            <li><a href="/basin-odasi.html" class="text-on-surface-variant hover:text-primary transition-colors">${t['nav.news']}</a></li>
            <li><a href="/kariyer.html" class="text-on-surface-variant hover:text-primary transition-colors">${t['nav.career']}</a></li>
            <li><a href="/yatirimci-iliskileri.html" class="text-on-surface-variant hover:text-primary transition-colors">${t['nav.investors']}</a></li>
          </ul>
        </div>

        <!-- Brands -->
        <div class="md:col-span-3">
          <h4 class="text-white font-bold text-sm tracking-widest uppercase mb-5">Markalarımız</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="/marka-detay.html#clicknow" class="text-on-surface-variant hover:text-primary transition-colors">Click NOW Digital</a></li>
            <li><a href="/marka-detay.html#onmuzik" class="text-on-surface-variant hover:text-primary transition-colors">On Müzik</a></li>
            <li><a href="/marka-detay.html#tikla" class="text-on-surface-variant hover:text-primary transition-colors">Tıkla Hemen Al</a></li>
            <li><a href="/marka-detay.html#xndtek" class="text-on-surface-variant hover:text-primary transition-colors">XND Tek</a></li>
            <li><a href="/marka-detay.html#nextgenlab" class="text-on-surface-variant hover:text-primary transition-colors">NextGenLab</a></li>
            <li><a href="/marka-detay.html#nextgenbox" class="text-on-surface-variant hover:text-primary transition-colors">NextGenBox</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="md:col-span-3">
          <h4 class="text-white font-bold text-sm tracking-widest uppercase mb-5">${t['footer.contact'] || 'İletişim'}</h4>
          <address class="not-italic space-y-3 text-sm text-on-surface-variant leading-relaxed">
            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-primary text-base mt-0.5">location_on</span>
              <span>${t['footer.address']}</span>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-primary text-base mt-0.5">schedule</span>
              <span>${t['footer.hours']}</span>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-primary text-base mt-0.5">mail</span>
              <a href="mailto:info@xnd.com.tr" class="hover:text-primary transition-colors">info@xnd.com.tr</a>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="material-symbols-outlined text-primary text-base mt-0.5">call</span>
              <a href="tel:+902165550000" class="hover:text-primary transition-colors">+90 (216) 555 00 00</a>
            </div>
          </address>
        </div>
      </div>

      <div class="border-t border-white/[0.06]">
        <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>${t['footer.copyright']}</p>
          <ul class="flex flex-wrap items-center gap-4 md:gap-6">
            <li><a href="/yasal.html" class="hover:text-primary transition-colors">${t['footer.privacy']}</a></li>
            <li><a href="/yasal.html#terms" class="hover:text-primary transition-colors">${t['footer.terms']}</a></li>
            <li><a href="/kvkk.html" class="hover:text-primary transition-colors">KVKK</a></li>
          </ul>
        </div>
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
 * Cookie consent banner
 */
export function renderCookieConsent() {
  if (localStorage.getItem('xnd_cookie_consent')) return;

  const lang = getCurrentLanguage();
  const t = translations[lang];

  const banner = document.createElement('div');
  banner.id = 'cookieConsent';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Çerez Onayı');
  banner.className = 'fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl z-[100] opacity-0 translate-y-8 transition-all duration-700';
  banner.innerHTML = `
    <div class="bg-[#0a0f1a]/85 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-2xl p-5 md:p-7 flex flex-col md:flex-row items-center gap-5">
      <div class="flex items-start gap-3 flex-1">
        <span class="material-symbols-outlined text-primary text-xl mt-0.5 flex-shrink-0">cookie</span>
        <div>
          <p class="text-white text-sm leading-relaxed">${t['cookie.message']}
            <a href="/yasal.html#cookies" class="text-primary hover:underline font-bold ml-1">${t['cookie.link']}</a>
          </p>
        </div>
      </div>
      <div class="flex gap-3 flex-shrink-0 w-full md:w-auto">
        <button id="cookieReject" class="flex-1 md:flex-none px-5 py-3 rounded-xl text-[10px] md:text-xs uppercase tracking-widest font-bold text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300 min-h-[44px]">
          ${t['cookie.reject']}
        </button>
        <button id="cookieAccept" class="flex-1 md:flex-none px-5 py-3 rounded-xl text-[10px] md:text-xs uppercase tracking-widest font-bold bg-primary text-[#080c14] hover:bg-primary/85 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)] min-h-[44px]">
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
