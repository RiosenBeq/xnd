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
          <a href="https://nextgenmedya.com.tr/" target="_blank" rel="noopener" class="flex items-center gap-2 text-[10px] text-white/40 hover:text-primary transition-colors uppercase tracking-widest font-medium group">
            <span>Designed by</span>
            <span class="font-bold group-hover:text-primary transition-colors">NextGen Medya</span>
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
