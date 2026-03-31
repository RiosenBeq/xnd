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
    return `<a data-i18n="nav.${l.id}" class="font-plus-jakarta text-[10px] md:text-xs tracking-widest uppercase relative transition-all duration-300 ${isActive ? 'text-primary font-black after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-neutral-400 hover:text-white'}" href="${l.href}">${t[`nav.${l.id}`] || l.label}</a>`;
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
      ${isActive ? '<div class="w-1 h-1 rounded-full bg-primary mt-0.5"></div>' : ''}
    </a>`;
  }).join('');

  navContainer.innerHTML = `
    <!-- ═══ Desktop Top Nav ═══ -->
    <nav class="fixed top-5 md:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl z-50 bg-[#060a12]/60 backdrop-blur-[32px] border border-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.7)] rounded-[2.5rem] transition-all duration-700 hover:bg-[#060a12]/80 overflow-hidden group/nav hidden md:block group">
      <!-- Ambient Inner Glow -->
      <div class="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none z-0"></div>
      <!-- Gold Accent Lines -->
      <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-40 group-hover/nav:opacity-80 transition-opacity duration-700"></div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover/nav:opacity-50 transition-opacity duration-1000"></div>
      
      <div class="flex justify-between items-center px-8 md:px-12 py-3 md:py-4 relative z-10 font-plus-jakarta">
        <a href="/index.html" class="mr-10 flex-shrink-0 relative group/logo focus:outline-none">
          <div class="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <img src="/header_logo.png" alt="XND Teknoloji Grubu" class="h-9 md:h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] relative z-10 transition-transform duration-500 group-hover/logo:scale-105" />
        </a>
        <div class="hidden md:flex gap-10 items-center justify-center flex-1" id="navLinks">
          ${linksHTML}
          <a data-i18n="nav.contact" class="text-[10px] md:text-xs tracking-widest uppercase relative transition-all duration-300 ${contactIsActive ? 'text-primary font-bold after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full after:shadow-[0_0_10px_rgba(201,168,76,0.6)]' : 'text-on-surface-variant hover:text-white font-medium'}" href="/iletisim.html">${t['nav.contact']}</a>
        </div>
        <div class="flex items-center space-x-5">
          <button id="langSwitcher" class="text-[10px] uppercase font-bold tracking-[0.2em] text-on-surface-variant hover:text-primary transition-all duration-300 bg-white/5 hover:bg-primary/10 px-4 py-2 rounded-full border border-white/5 hover:border-primary/30 backdrop-blur-md active:scale-95">
            ${lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <a data-i18n="nav.cta" href="/iletisim.html" class="btn-premium px-7 py-3 text-[10px] tracking-widest shadow-[0_10px_30px_rgba(201,168,76,0.1)] hover:shadow-[0_20px_50px_rgba(201,168,76,0.25)] hover:-translate-y-1 active:translate-y-0 rounded-full transition-all duration-300">${t['nav.cta']}</a>
        </div>
      </div>
    </nav>

    <!-- ═══ Mobile Top Bar (minimal) ═══ -->
    <nav class="fixed top-0 left-0 right-0 z-50 md:hidden bg-[#0a0f1a]/80 backdrop-blur-2xl border-b border-white/[0.05]">
      <div class="flex justify-between items-center px-5 py-3">
        <a href="/index.html" class="flex-shrink-0">
          <img src="/header_logo.png" alt="XND" class="h-9 w-auto object-contain" />
        </a>
        <div class="flex items-center gap-3">
          <button id="langSwitcherMobile" class="text-[10px] uppercase font-bold tracking-widest text-neutral-400 hover:text-primary transition-colors bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
            ${lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <a href="/iletisim.html" class="btn-premium px-4 py-2 text-[9px] tracking-widest">${t['nav.cta']}</a>
        </div>
      </div>
    </nav>

    <!-- ═══ Mobile Bottom Sticky Nav ═══ -->
    <nav id="mobileBottomNav" class="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#060a12]/90 backdrop-blur-2xl border-t border-white/[0.06] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] safe-area-bottom">
      <div class="flex justify-around items-center px-2 py-2.5 max-w-md mx-auto">
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

  const lang = getCurrentLanguage();
  const t = translations[lang];

  footerContainer.innerHTML = `
    <footer class="relative w-full border-t border-white/[0.04] overflow-hidden bg-[#040810] pb-20 md:pb-0">
      <!-- Ambient glow -->
      <div class="absolute bottom-[-10%] right-[-8%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-40"></div>
      
      <div class="max-w-7xl mx-auto pt-20 pb-10 px-6 md:px-12 lg:px-16">
        <!-- Large headline -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div class="relative z-10">
            <h2 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-3 text-white leading-[0.9]">Let's build <br/><span class="text-gradient italic">the future.</span></h2>
            <p data-i18n="footer.desc" class="text-on-surface-variant max-w-sm text-sm leading-relaxed mt-5">${t['footer.desc']}</p>
          </div>
          <a data-i18n="footer.contact" href="/iletisim.html" class="btn-premium px-8 py-4 text-xs tracking-widest uppercase relative z-10 hover:scale-105 transition-transform duration-500">
            ${t['footer.contact']} <span class="material-symbols-outlined ml-2 text-sm">rocket_launch</span>
          </a>
        </div>
        
        <!-- Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10 font-plus-jakarta text-sm leading-relaxed border-t border-white/[0.06] pt-14 relative z-10">
          <!-- Brand column -->
          <div class="space-y-6 col-span-2 md:col-span-1">
            <img src="/header_logo.png" alt="XND Teknoloji Grubu" class="h-10 md:h-12 w-auto object-contain opacity-80" />
            <div class="flex space-x-3">
              <a class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:-translate-y-1 text-on-surface-variant border border-white/5" href="https://www.instagram.com/xndteknolojigrubu" target="_blank"><span class="material-symbols-outlined text-sm">photo_camera</span></a>
              <a class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:-translate-y-1 text-on-surface-variant border border-white/5" href="https://www.linkedin.com/company/xndgrouptr" target="_blank"><span class="material-symbols-outlined text-sm">work</span></a>
              <a class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:-translate-y-1 text-on-surface-variant border border-white/5" href="https://xnd.com.tr" target="_blank"><span class="material-symbols-outlined text-sm">language</span></a>
            </div>
          </div>
          
          <!-- Contact column -->
          <div class="space-y-5">
            <p data-i18n="footer.contact" class="text-white/50 font-bold uppercase tracking-[0.2em] text-[10px]">${t['footer.contact']}</p>
            <ul class="space-y-3 text-on-surface-variant text-xs">
              <li class="flex items-start gap-2.5"><span class="material-symbols-outlined text-sm mt-0.5 text-primary">location_on</span><span data-i18n="footer.address" class="leading-relaxed">${t['footer.address']}</span></li>
              <li class="flex items-center gap-2.5"><span class="material-symbols-outlined text-sm text-primary">call</span><a href="tel:+908502419575" class="hover:text-primary transition-colors">+90 850 241 95 75</a></li>
              <li class="flex items-center gap-2.5"><span class="material-symbols-outlined text-sm text-primary">mail</span><a href="mailto:iletisim@xnd.com.tr" class="hover:text-primary transition-colors">iletisim@xnd.com.tr</a></li>
              <li class="flex items-center gap-2.5"><span class="material-symbols-outlined text-sm text-primary">schedule</span><span data-i18n="footer.hours">${t['footer.hours']}</span></li>
            </ul>
          </div>
          
          <!-- Quick links column -->
          <div class="space-y-5">
            <p data-i18n="footer.quick_links" class="text-white/50 font-bold uppercase tracking-[0.2em] text-[10px]">${t['footer.quick_links']}</p>
            <ul class="space-y-2.5 text-on-surface-variant text-xs">
              <li><a data-i18n="nav.home" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/index.html">${t['nav.home']}</a></li>
              <li><a data-i18n="nav.about" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/hakkimizda.html">${t['nav.about']}</a></li>
              <li><a data-i18n="nav.services" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/hizmetler.html">${t['nav.services']}</a></li>
              <li><a data-i18n="nav.brands" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/marka-detay.html">${t['nav.brands']}</a></li>
              <li><a data-i18n="nav.news" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/basin-odasi.html">${t['nav.news'] || 'Basın Odası'}</a></li>
              <li><a data-i18n="nav.career" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/kariyer.html">${t['nav.career']}</a></li>
              <li><a data-i18n="nav.investors" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/yatirimci-iliskileri.html">${t['nav.investors'] || 'Yatırımcı İlişkileri'}</a></li>
            </ul>
          </div>
          
          <!-- Legal column -->
          <div class="space-y-5">
            <p data-i18n="footer.legal" class="text-white/50 font-bold uppercase tracking-[0.2em] text-[10px]">${t['footer.legal']}</p>
            <ul class="space-y-2.5 text-on-surface-variant text-xs">
              <li><a data-i18n="footer.privacy" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/yasal.html">${t['footer.privacy']}</a></li>
              <li><a data-i18n="footer.terms" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/yasal.html">${t['footer.terms']}</a></li>
              <li><a data-i18n="footer.kvkk" class="hover:text-primary hover:translate-x-1 transition-all inline-block" href="/kvkk.html">NextGenBox KVKK</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Bottom bar with credits -->
      <div class="px-6 md:px-16 lg:px-24 py-5 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4 bg-black/20 relative z-10 w-full max-w-7xl mx-auto">
        <p data-i18n="footer.copyright" class="text-white/30 text-[10px] uppercase tracking-[0.3em] font-medium">${t['footer.copyright']}</p>
        <div class="flex items-center gap-6">
          <div class="flex gap-6 text-[10px] uppercase tracking-widest text-white/30 font-medium">
            <a data-i18n="footer.privacy" href="/yasal.html" class="hover:text-white transition-colors">${t['footer.privacy']}</a>
            <a data-i18n="footer.terms" href="/yasal.html" class="hover:text-white transition-colors">${t['footer.terms']}</a>
          </div>
          <span class="text-white/20">|</span>
          <a href="https://nextgenlab.com.tr" target="_blank" class="flex items-center gap-2 text-[10px] text-white/40 hover:text-primary transition-colors uppercase tracking-widest font-medium group">
            <span>Designed by</span>
            <img src="/logo_nextgen.png" alt="NextGen Lab" class="h-4 w-auto object-contain opacity-50 group-hover:opacity-90 transition-opacity" onerror="this.style.display='none'" />
            <span class="font-bold">NextGen Lab</span>
          </a>
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
