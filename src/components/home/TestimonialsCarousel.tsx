import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type T = { name: string; text: string };

const photos = [
  { src: '/images/coolsprings/coolsprings-people-10.webp', alt: 'Therapist guiding a patient through an exercise' },
  { src: '/images/coolsprings/coolsprings-people-12.webp', alt: 'Patient and therapist working together' },
  { src: '/images/coolsprings/coolsprings-people-13.webp', alt: 'One-on-one session at Performance Therapy Institute' },
  { src: '/images/coolsprings/coolsprings-people-14.webp', alt: 'Therapist helping a patient with movement' },
  { src: '/images/coolsprings/coolsprings-people-19.webp', alt: 'Smiling patient during a visit' },
];

const Stars = () => (
  <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, k) => (
      <svg key={k} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z" /></svg>
    ))}
  </div>
);

export default function TestimonialsCarousel({ items }: { items: T[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = items.length;

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((i + 1) % n), 6500);
    return () => clearTimeout(t);
  }, [i, paused, reduce, n]);

  const q = items[i];
  const p = photos[i % photos.length];
  return (
    <div
      className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative mx-auto w-full max-w-[30rem] pb-6 pl-6 lg:mx-0">
        <div aria-hidden="true" className="absolute bottom-0 left-0 top-6 w-[calc(100%-1.5rem)] rounded-[10px] border border-gold/60" />
        <div className="relative overflow-hidden rounded-[10px] shadow-[0_50px_90px_-40px_rgba(0,0,0,.8)]">
          <AnimatePresence mode="sync">
            <motion.img key={p.src} src={p.src} alt={p.alt} width={900} height={900} loading="lazy" className="img-sq absolute inset-0 !rounded-none" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
          </AnimatePresence>
          <div className="aspect-square" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" aria-hidden="true" />
        </div>
        <div className="absolute -right-2 bottom-0 rounded-[10px] bg-white px-5 py-4 text-navy shadow-xl lg:-right-8">
          <p className="font-display text-3xl leading-none">5.0</p>
          <div className="mt-2 text-gold"><Stars /></div>
          <p className="mt-1.5 text-[11px] uppercase tracking-[.18em] text-navy/60">Patient rated</p>
        </div>
      </div>

      <div>
        <svg className="mb-5 h-11 w-11 text-red" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9.3 5C5.6 6.7 3 10 3 14.3V19h7v-6H6.2c.2-2.2 1.5-4 3.8-5.2L9.3 5zm10 0c-3.7 1.7-6.3 5-6.3 9.3V19h7v-6h-3.8c.2-2.2 1.5-4 3.8-5.2L19.300 5z" />
        </svg>
        <div className="min-h-[11rem] md:min-h-[12rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.5 }}>
              <blockquote className="font-display text-3xl font-medium leading-snug text-white md:text-[2.8rem] md:leading-[1.15]">“{q.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <span className="h-px w-10 bg-gold" aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-[.2em] text-white/80">{q.name}, patient</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5">
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous review" onClick={() => setI((i - 1 + n) % n)} className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-navy">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <div className="flex">
              {items.map((_, k) => (
                <button key={k} type="button" aria-label={`Review ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} className="grid h-11 w-6 place-items-center">
                  <span className={`block h-2.5 rounded-full transition-all ${k === i ? 'w-7 bg-red' : 'w-2.5 bg-white/40'}`} />
                </button>
              ))}
            </div>
            <button type="button" aria-label="Next review" onClick={() => setI((i + 1) % n)} className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-navy">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </div>
          <a href="/testimonials" className="btn btn-ghost-light">Read More Reviews</a>
        </div>
      </div>
    </div>
  );
}
