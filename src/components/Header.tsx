import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type NavChild = { label: string; href: string; desc?: string; external?: boolean };
type NavItem = {
  label: string; href: string; children?: NavChild[];
  mega?: { title: string; text: string; image: string; cta: { label: string; href: string } };
};

type Props = {
  nav: NavItem[];
  bookingUrl: string;
  phone: string;
  lightHero?: boolean;
};

const ICONS = [
  'M22 12h-4l-3 9L9 3l-3 9H2',
  'M20.8 4.6a5.5 5.5 0 00-7.800 0L12 5.700l-1.100-1.100a5.500 5.500 0 00-7.800 7.800l1.100 1.100L12 21l7.700-7.600 1.100-1.100a5.500 5.500 0 000-7.700z',
  'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  'M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8z',
  'M12 2l3 6.900 7.500.7-5.700 5 1.700 7.400L12 18l-6.500 4 1.700-7.400-5.700-5 7.500-.7z',
];

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function Header({ nav, bookingUrl, lightHero = true }: Props) {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [path, setPath] = useState('');
  const [menu, setMenu] = useState<string | null>(null);
  const [anchor, setAnchor] = useState(0);
  const [mob, setMob] = useState<string | null>(null);
  const closeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPath(window.location.pathname.replace(/\/$/, ''));
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); setMenu(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = true; // always the light bar, so the look never flips while moving the mouse
  const compact = scrolled || open || !lightHero;
  const isActive = (href: string) => path !== '' && (path === href || path.startsWith(href + '/'));
  const itemActive = (n: NavItem) => isActive(n.href) || !!n.children?.some((c) => !c.external && isActive(c.href));
  const openMenu = (n: NavItem, el?: HTMLElement | null) => {
    if (closeT.current) { clearTimeout(closeT.current); closeT.current = null; }
    if (!n.children) { setMenu(null); return; }
    if (el) { const r = el.getBoundingClientRect(); setAnchor(r.left + r.width / 2); }
    setMenu(n.href);
  };
  const scheduleClose = () => {
    if (closeT.current) clearTimeout(closeT.current);
    closeT.current = setTimeout(() => { setMenu(null); setHover(null); }, 140);
  };
  const current = nav.find((n) => n.href === menu);

  return (
    <>
      <header
        onMouseLeave={scheduleClose}
        onMouseEnter={() => { if (closeT.current) { clearTimeout(closeT.current); closeT.current = null; } }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-white/90 shadow-[0_1px_0_rgba(20,33,61,.08),0_14px_40px_-18px_rgba(20,33,61,.35)] backdrop-blur-xl'
            : 'bg-gradient-to-b from-navy-deep/80 via-navy-deep/35 to-transparent'
        }`}
      >
        <div className={`mx-auto flex max-w-[92rem] items-center justify-between gap-6 px-4 transition-all duration-500 md:px-10 ${compact ? 'py-2' : 'py-4 md:py-5'}`}>
          <a href="/" aria-label="Performance Therapy Institute, home" className={`flex shrink-0 items-center transition-all duration-500 ${compact ? 'h-10 md:h-12' : 'h-12 md:h-[4.5rem]'}`}>
            {/* The wordmark loads first, then the runner icon slides in from the left edge of the screen. */}
            <motion.img
              src="/images/logo-icon.png" alt="" aria-hidden="true" width={240} height={195}
              className="relative z-10 h-full w-auto"
              initial={reduceMotion ? false : { x: '-55vw', opacity: 0, rotate: -8 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 70, damping: 16, mass: 1.1 }}
            />
            <motion.img
              src="/images/logo-text.png" alt="Performance Therapy Institute" width={698} height={195}
              className="-ml-px h-full w-auto"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </a>

          <nav aria-label="Main" className="hidden items-center min-[1320px]:flex">
            {nav.map((n) => {
              const active = itemActive(n);
              const isOpen = menu === n.href;
              return (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  aria-haspopup={n.children ? 'true' : undefined}
                  aria-expanded={n.children ? isOpen : undefined}
                  onMouseEnter={(e) => { setHover(n.href); openMenu(n, e.currentTarget); }}
                  onFocus={(e) => { setHover(n.href); openMenu(n, e.currentTarget); }}
                  onKeyDown={(e) => { if (e.key === 'ArrowDown' && n.children) { e.preventDefault(); openMenu(n, e.currentTarget); (document.querySelector('#menu-panel a') as HTMLElement | null)?.focus(); } }}
                  className={`relative inline-flex items-center gap-1 whitespace-nowrap px-3.5 py-3 text-[15px] tracking-[.03em] transition-colors duration-300 ${
                    solid ? (active ? 'font-semibold text-navy' : 'font-medium text-navy/80 hover:text-navy') : `${active ? 'font-semibold' : 'font-medium'} text-white [text-shadow:0_1px_10px_rgba(0,0,0,.45)]`
                  }`}
                >
                  {hover === n.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-x-1 inset-y-1.5 rounded-md ${solid ? 'bg-navy/[.06]' : 'bg-white/[.14] ring-1 ring-white/25 backdrop-blur-sm'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{n.label}</span>
                  {n.children && (
                    <svg className={`relative h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  )}
                  {active && <span className="absolute inset-x-4 bottom-1 h-[2px] rounded-full bg-red" />}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a href={bookingUrl} className="btn btn-red group hidden whitespace-nowrap sm:inline-flex">
              Book Appointment
              <span className="transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
              className={`grid h-12 w-12 place-items-center rounded-full min-[1320px]:hidden ${solid ? 'text-navy' : 'text-white'}`}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h10" />}
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {current && (
            <motion.div
              key="panel"
              id="menu-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full hidden pt-3 min-[1320px]:block"
            >
              {(() => {
                const vw = typeof window === 'undefined' ? 1440 : window.innerWidth;
                const wide = !!current.mega;
                const w = wide ? Math.min(1020, vw - 32) : 320;
                const left = wide ? (vw - w) / 2 : Math.max(16, Math.min(anchor - w / 2, vw - w - 16));
                const notch = Math.max(28, Math.min(anchor - left, w - 28));
                const kids = current.children!;
                const half = Math.ceil(kids.length / 2);
                const cols = wide ? [kids.slice(0, half), kids.slice(half)] : [kids];
                return (
                  <motion.div initial={{ x: left, width: w }} animate={{ x: left, width: w }} transition={{ type: 'spring', stiffness: 420, damping: 38 }} className="relative rounded-[16px] bg-white shadow-[0_40px_90px_-30px_rgba(20,33,61,.5)] ring-1 ring-navy/10">
                    <motion.span aria-hidden="true" initial={{ x: notch - 8 }} animate={{ x: notch - 8 }} transition={{ type: 'spring', stiffness: 420, damping: 38 }} className="absolute -top-2 left-0 h-4 w-4"><span className="block h-4 w-4 rotate-45 rounded-[3px] bg-white [clip-path:polygon(0_0,100%_0,0_100%)]" /></motion.span>
                    <motion.div key={current.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.22 }} className={wide ? 'grid grid-cols-[1fr_1fr_16rem]' : ''}>
                      {cols.map((col, ci) => (
                        <div key={ci} className="p-4">
                          {wide && <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[.2em] text-navy/50">{ci === 0 ? current.mega!.title : '\u00a0'}</p>}
                          <ul>
                            {col.map((c, k) => (
                              <li key={c.href + c.label}>
                                <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener' } : {})} aria-current={!c.external && isActive(c.href) ? 'page' : undefined} className="group flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream">
                                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-red/[.07] text-red transition-colors duration-300 group-hover:bg-red group-hover:text-white">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[(k + ci * 3) % ICONS.length]} /></svg>
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[14.5px] font-semibold leading-tight text-navy">{c.label}</span>
                                    {c.desc && <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{c.desc}</span>}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                          {wide && ci === 0 && (
                            <a href={current.mega!.cta.href} className="btn btn-ghost-dark mt-3 !min-h-10 !px-4 !py-2 text-[13px]">{current.mega!.cta.label} <Arrow /></a>
                          )}
                        </div>
                      ))}
                      {wide && (
                        <div className="m-3 flex flex-col rounded-[12px] bg-cream p-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-navy/50">Need help?</p>
                          <ul className="mt-3 grid gap-1 text-[14px] text-navy/85">
                            {[
                              ['Find a clinic', '/contact', 'M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.800-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z'],
                              ['Patient reviews', '/testimonials', 'M12 2l3 6.900 7.500.7-5.700 5 1.700 7.400L12 18l-6.500 4 1.700-7.400-5.700-5 7.500-.7z'],
                              ['Insurance plans', '/patient-info', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
                            ].map(([l, h, d]) => (
                              <li key={l}><a href={h} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white hover:text-red"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>{l}</a></li>
                            ))}
                          </ul>
                          <a href={bookingUrl} className="btn btn-red mt-auto w-full whitespace-nowrap !px-4">Book Appointment</a>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white px-6 pb-10 pt-4 min-[1320px]:hidden">
          <nav aria-label="Mobile" className="grid">
            {nav.map((n) => {
              const expanded = mob === n.href;
              const cls = `font-display flex w-full items-center justify-between border-b border-stone py-5 text-left text-[1.75rem] ${itemActive(n) ? 'italic text-red' : 'text-navy'}`;
              if (!n.children) {
                return <a key={n.href} href={n.href} onClick={() => setOpen(false)} className={cls}>{n.label}<Arrow /></a>;
              }
              return (
                <div key={n.href}>
                  <button type="button" aria-expanded={expanded} onClick={() => setMob(expanded ? null : n.href)} className={cls}>
                    {n.label}
                    <svg className={`h-5 w-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-b border-stone bg-cream/60">
                        <li><a href={n.href} onClick={() => setOpen(false)} className="btn btn-ghost-dark m-3 !min-h-10 text-[14px]">View all {n.label.toLowerCase()}</a></li>
                        {n.children.map((c) => (
                          <li key={c.href}><a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener' } : {})} onClick={() => setOpen(false)} className="block px-4 py-3 text-[16px] text-navy/85">{c.label}</a></li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
          <div className="mt-8 grid gap-3">
            <a href={bookingUrl} className="btn btn-red">Book Appointment</a>
          </div>
        </div>
      )}
    </>
  );
}
