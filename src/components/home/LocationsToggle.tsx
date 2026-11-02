import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Loc = { id: string; name: string; address: string; city: string; phone: string; fax: string; image: string; hours?: string };

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function LocationsToggle({ locations, hours, bookingUrl }: { locations: Loc[]; hours: string; bookingUrl: string }) {
  const [active, setActive] = useState(0);
  const loc = locations[active];
  const query = encodeURIComponent(`Performance Therapy Institute, ${loc.address}, ${loc.city}`);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      {/* Location list */}
      <ul className="self-start border-b border-white/15">
        {locations.map((l, k) => {
          const on = k === active;
          return (
            <li key={l.id} className="border-t border-white/15">
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`loc-${l.id}`}
                onClick={() => setActive(k)}
                className="group relative flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span aria-hidden="true" className={`absolute left-0 top-0 h-px bg-gold transition-all duration-700 ${on ? 'w-full' : 'w-0'}`} />
                <span>
                  <span className={`font-display block text-[1.9rem] leading-tight transition-all duration-500 md:text-[2.4rem] ${on ? 'translate-x-2 italic text-white' : 'text-white/55 group-hover:text-white/85'}`}>{l.name}</span>
                  <span className={`mt-1 block text-xs uppercase tracking-[.2em] transition-all duration-500 ${on ? 'translate-x-2 text-gold' : 'text-white/40'}`}>{l.city}</span>
                </span>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? 'rotate-[-45deg] border-gold bg-gold text-navy-deep' : 'border-white/30 text-white group-hover:border-white'}`}><Arrow /></span>
              </button>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div id={`loc-${l.id}`} role="region" aria-label={`${l.name} details`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <div className="pb-8 pl-2 pr-2">
                      <address className="text-lg not-italic leading-relaxed text-white/85">{l.address}<br />{l.city}</address>
                      <dl className="mt-5 grid gap-3 text-[15px] sm:grid-cols-[auto_1fr] sm:gap-x-8">
                        <dt className="text-xs uppercase tracking-[.2em] text-gold sm:pt-1">Phone</dt>
                        <dd><a className="text-lg font-semibold text-white underline-offset-4 hover:underline" href={`tel:${l.phone.replace(/[^0-9]/g, '')}`}>{l.phone}</a></dd>
                        <dt className="text-xs uppercase tracking-[.2em] text-gold sm:pt-1">Fax</dt>
                        <dd className="text-white/75">{l.fax}</dd>
                        <dt className="text-xs uppercase tracking-[.2em] text-gold sm:pt-1">Hours</dt>
                        <dd className="text-white/75">{l.hours ?? hours}</dd>
                      </dl>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <a href={`/locations/${l.id}`} className="btn btn-ghost-light">Clinic details</a>
                        <a href={bookingUrl} className="btn btn-red">Book at {l.name}</a>
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${query}`} target="_blank" rel="noopener" className="btn btn-ghost-light">Get Directions</a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Clinic photos */}
      <div className="relative min-h-[26rem] self-start overflow-hidden rounded-[10px] border border-white/15 bg-navy shadow-[0_50px_100px_-40px_rgba(0,0,0,.8)] lg:sticky lg:top-28 lg:aspect-[5/5.2] lg:min-h-0">
        <AnimatePresence mode="sync">
          <motion.div key={loc.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            {loc.image ? (
              <img src={loc.image} alt={`${loc.name} clinic`} width={1100} height={1100} loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-navy to-navy-deep">
                <div className="text-center">
                  <img src="/images/Logo-white.png" alt="" width={320} height={66} className="mx-auto w-64" />
                  <p className="mt-6 text-xs uppercase tracking-[.25em] text-gold">Photos coming soon</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/30" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-4 rounded-[6px] border border-white/25" />

        <div className="absolute left-7 top-7 rounded-full border border-white/25 bg-navy-deep/70 px-4 py-2 text-xs uppercase tracking-[.2em] text-white backdrop-blur">
          {loc.name} <span className="text-gold">· {String(active + 1).padStart(2, '0')}/{String(locations.length).padStart(2, '0')}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={loc.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute inset-x-7 bottom-7 text-white">
            <p className="text-xs uppercase tracking-[.22em] text-white/75">Visit us</p>
            <p className="font-display mt-1 text-3xl italic md:text-4xl">{loc.name}</p>
            <p className="mt-1 text-sm text-white/80">{loc.address}, {loc.city}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
