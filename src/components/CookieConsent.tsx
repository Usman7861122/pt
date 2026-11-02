import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Cookie consent: a small banner plus a preferences panel with one switch per category.
 *
 * - The choice is saved in localStorage and in a first-party cookie (`pti_consent`) for 12 months.
 * - Anyone can reopen the panel from the footer: any element with `data-cookie-settings`, or
 *   `window.dispatchEvent(new Event('pti:open-cookie-settings'))`.
 * - To load a script only after consent, listen for the `pti:consent` event or read `window.ptiConsent`:
 *     if (window.ptiConsent?.analytics) { /* load analytics *\/ }
 *     window.addEventListener('pti:consent', (e) => { if (e.detail.analytics) { ... } });
 * - If Google Tag Manager / gtag is on the page, we also send a Consent Mode update.
 * Bump VERSION when the categories change so everyone is asked again.
 */

const KEY = 'pti-consent';
const COOKIE = 'pti_consent';
const VERSION = 1;
const MONTHS = 12;

type Choice = { preferences: boolean; analytics: boolean; marketing: boolean };
type Saved = Choice & { v: number; necessary: true; ts: number };

declare global {
  interface Window { ptiConsent?: Saved | null; dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void }
}

const CATS: { id: keyof Choice | 'necessary'; title: string; text: string; locked?: boolean }[] = [
  { id: 'necessary', title: 'Strictly necessary', locked: true, text: 'These keep the site working and remember your cookie choice. They are always on and do not track you.' },
  { id: 'preferences', title: 'Preferences', text: 'These remember your settings, such as a clinic you picked, so you do not have to choose again.' },
  { id: 'analytics', title: 'Analytics', text: 'These help us see which pages people visit and how the site is used, so we can make it easier to use. The data is combined, not personal.' },
  { id: 'marketing', title: 'Marketing', text: 'These help us measure our ads and show you relevant information about our care on other sites.' },
];

function read(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw) as Saved;
      if (s.v === VERSION) return s;
    }
  } catch { /* storage blocked */ }
  return null;
}

function write(c: Choice): Saved {
  const s: Saved = { v: VERSION, necessary: true, ts: Date.now(), ...c };
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ }
  try {
    const exp = new Date(); exp.setMonth(exp.getMonth() + MONTHS);
    document.cookie = `${COOKIE}=${encodeURIComponent(`p${+c.preferences}a${+c.analytics}m${+c.marketing}`)}; expires=${exp.toUTCString()}; path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  } catch { /* ignore */ }
  return s;
}

function announce(s: Saved) {
  window.ptiConsent = s;
  window.dispatchEvent(new CustomEvent('pti:consent', { detail: s }));
  const g = (v: boolean) => (v ? 'granted' : 'denied');
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: g(s.analytics), ad_storage: g(s.marketing), ad_user_data: g(s.marketing), ad_personalization: g(s.marketing), functionality_storage: g(s.preferences), personalization_storage: g(s.preferences) });
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'consent_update', consent: { analytics: s.analytics, marketing: s.marketing, preferences: s.preferences } });
    }
  } catch { /* ignore */ }
}

export default function CookieConsent() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [banner, setBanner] = useState(false);
  const [panel, setPanel] = useState(false);
  const [draft, setDraft] = useState<Choice>({ preferences: false, analytics: false, marketing: false });
  const panelRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const s = read();
    if (s) { announce(s); setDraft({ preferences: s.preferences, analytics: s.analytics, marketing: s.marketing }); }
    else { window.ptiConsent = null; setBanner(true); }
    setReady(true);
  }, []);

  const openPanel = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    const s = read();
    setDraft(s ? { preferences: s.preferences, analytics: s.analytics, marketing: s.marketing } : { preferences: false, analytics: false, marketing: false });
    setPanel(true);
  }, []);

  useEffect(() => {
    const onEvent = () => openPanel();
    const onClick = (e: MouseEvent) => { if ((e.target as HTMLElement)?.closest?.('[data-cookie-settings]')) { e.preventDefault(); openPanel(); } };
    window.addEventListener('pti:open-cookie-settings', onEvent);
    document.addEventListener('click', onClick);
    return () => { window.removeEventListener('pti:open-cookie-settings', onEvent); document.removeEventListener('click', onClick); };
  }, [openPanel]);

  const close = useCallback(() => {
    setPanel(false);
    setTimeout(() => opener.current?.focus?.(), 0);
  }, []);

  const save = (c: Choice) => { announce(write(c)); setBanner(false); close(); };

  // Keyboard: Escape closes the panel, Tab stays inside it, focus moves in when it opens.
  useEffect(() => {
    if (!panel) return;
    const node = panelRef.current;
    const focusable = () => Array.from(node?.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])') ?? []).filter((el) => !el.hasAttribute('disabled'));
    focusable()[0]?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key !== 'Tab') return;
      const f = focusable(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [panel, close]);

  if (!ready) return null;
  const t = reduce ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };
  const all = { preferences: true, analytics: true, marketing: true };
  const none = { preferences: false, analytics: false, marketing: false };

  return (
    <>
      <AnimatePresence>
        {banner && !panel && (
          <motion.div
            role="dialog" aria-labelledby="ck-title" aria-describedby="ck-desc"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : 24 }} transition={t}
            className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[34rem] rounded-[10px] border border-navy/15 bg-white p-6 text-navy shadow-[0_30px_80px_-20px_rgba(11,20,38,.55)] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0"
          >
            <h2 id="ck-title" className="font-display text-2xl leading-tight">Your privacy choices</h2>
            <p id="ck-desc" className="mt-2 text-[15px] leading-relaxed text-navy/75">
              We use cookies to keep this site working and, only if you say yes, to understand how it is used and to measure our ads. Read our <a href="/cookie-policy" className="underline decoration-red decoration-2 underline-offset-4 hover:text-red">Cookie Policy</a>.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button type="button" onClick={() => save(all)} className="btn btn-navy !min-h-[44px] !py-2 text-sm">Accept all</button>
              <button type="button" onClick={() => save(none)} className="btn btn-ghost-dark !min-h-[44px] !py-2 text-sm">Reject non-essential</button>
            </div>
            <button type="button" onClick={openPanel} className="mt-3 w-full rounded-[6px] py-2 text-center text-sm font-semibold text-navy underline decoration-red decoration-2 underline-offset-4 hover:text-red">Customize my choices</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panel && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-end bg-navy-deep/70 p-0 backdrop-blur-sm sm:place-items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t} onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
            <motion.div
              ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="ck-panel-title"
              initial={{ opacity: 0, y: reduce ? 0 : 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduce ? 0 : 40 }} transition={t}
              className="flex max-h-[92vh] w-full max-w-[40rem] flex-col overflow-hidden rounded-t-[14px] bg-white text-navy shadow-2xl sm:rounded-[10px]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-navy/10 p-6 pb-5">
                <div>
                  <p className="eyebrow">Cookie settings</p>
                  <h2 id="ck-panel-title" className="font-display mt-2 text-3xl leading-tight">Choose what you allow</h2>
                </div>
                <button type="button" onClick={close} aria-label="Close cookie settings" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy/20 text-xl leading-none hover:border-red hover:text-red">×</button>
              </div>

              <div className="overflow-y-auto p-6 pt-4">
                <p className="text-[15px] leading-relaxed text-navy/70">Turn each group on or off. You can change your mind at any time from “Cookie settings” in the footer. Learn more in our <a href="/cookie-policy" className="underline decoration-red decoration-2 underline-offset-4 hover:text-red">Cookie Policy</a>.</p>
                <ul className="mt-5 divide-y divide-navy/10 border-y border-navy/10">
                  {CATS.map((c) => {
                    const on = c.id === 'necessary' ? true : draft[c.id];
                    const id = `ck-${c.id}`;
                    return (
                      <li key={c.id} className="flex items-start justify-between gap-5 py-5">
                        <div>
                          <label htmlFor={id} className="font-display block text-xl">{c.title}{c.locked && <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wider text-navy/50">Always on</span>}</label>
                          <p id={`${id}-d`} className="mt-1 text-[15px] leading-relaxed text-navy/70">{c.text}</p>
                        </div>
                        <button
                          id={id} type="button" role="switch" aria-checked={on} aria-describedby={`${id}-d`} disabled={c.locked}
                          onClick={() => c.id !== 'necessary' && setDraft((d) => ({ ...d, [c.id]: !d[c.id as keyof Choice] }))}
                          className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${on ? 'bg-navy' : 'bg-navy/25'} ${c.locked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                        >
                          <span aria-hidden="true" className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${on ? 'translate-x-5' : ''}`} />
                          <span className="sr-only">{on ? 'On' : 'Off'}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="grid gap-2 border-t border-navy/10 bg-cream p-5 sm:grid-cols-3">
                <button type="button" onClick={() => save(draft)} className="btn btn-navy !min-h-[44px] !py-2 text-sm">Save my choices</button>
                <button type="button" onClick={() => save(none)} className="btn btn-ghost-dark !min-h-[44px] !py-2 text-sm">Reject non-essential</button>
                <button type="button" onClick={() => save(all)} className="btn btn-ghost-dark !min-h-[44px] !py-2 text-sm">Accept all</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
