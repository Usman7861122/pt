import { useEffect, useRef, useState } from 'react';

type Img = { src: string; alt: string; place: string; caption: string; big?: boolean; right?: boolean };

const Icon = ({ d }: { d: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export default function GalleryGrid({ images, title = 'Step', accent = 'inside', after = 'our clinics.' }: { images: Img[]; title?: string; accent?: string; after?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = images.length;

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % n));
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + n) % n));
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, n]);

  return (
    <>
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-4 text-4xl font-medium leading-[1.06] text-navy md:text-6xl">{title} <em className="text-red">{accent}</em> {after}</h2>
        </div>
        <button type="button" onClick={() => setOpen(0)} className="link-arrow text-navy">
          View all {n} photos
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>

      <ul className="grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {images.map((g, k) => (
          <li key={g.src} className={`${g.big ? 'col-span-2 row-span-2' : ''} ${g.right ? 'md:col-start-3' : ''}`}>
            <button type="button" onClick={() => setOpen(k)} aria-label={`Open photo: ${g.alt}`} className="group relative block w-full overflow-hidden rounded-[10px] bg-navy text-left">
              <img src={g.src} alt={g.alt} loading="lazy" width={g.big ? 1000 : 600} height={g.big ? 1000 : 600} className="img-sq !rounded-none transition-transform duration-[1400ms] ease-out group-hover:scale-[1.09]" />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span aria-hidden="true" className="absolute inset-3 rounded-[6px] border border-white/0 transition-all duration-700 group-hover:inset-4 group-hover:border-white/55" />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-white opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:p-7">
                <span className="block text-[11px] uppercase tracking-[.22em] text-gold">{g.place}</span>
                <span className={`font-display mt-1 block leading-snug ${g.big ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>{g.caption}</span>
              </span>
              <span aria-hidden="true" className="absolute right-4 top-4 grid h-10 w-10 scale-75 place-items-center rounded-full bg-white text-navy opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <Icon d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[60] grid place-items-center bg-navy-deep/96 p-4 backdrop-blur-sm" onClick={() => setOpen(null)}>
          <button ref={closeRef} type="button" aria-label="Close" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/25"><Icon d="M6 6l12 12M18 6L6 18" /></button>
          <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + n) % n); }} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/25"><Icon d="M15 6l-6 6 6 6" /></button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl text-center">
            <img src={images[open].src} alt={images[open].alt} className="mx-auto max-h-[76vh] max-w-full rounded-[10px] object-contain" />
            <figcaption className="mt-5 text-white">
              <span className="block text-[11px] uppercase tracking-[.22em] text-gold">{images[open].place} · {String(open + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
              <span className="font-display mt-1 block text-2xl italic">{images[open].caption}</span>
            </figcaption>
          </figure>
          <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % n); }} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/25"><Icon d="M9 6l6 6-6 6" /></button>
        </div>
      )}
    </>
  );
}
