import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Slide = { image: string; position: string; alt: string; eyebrow: string; words: string[]; sub: string };
const DURATION = 7000;

export default function HeroSlider({ slides, bookingUrl }: { slides: Slide[]; bookingUrl: string }) {
  const started = useRef(false); // first slide shows at once (good for speed) and still starts zooming
  useEffect(() => { started.current = true; }, []);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, reduce, go]);

  const s = slides[i];

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label="Welcome"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-deep text-white md:items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <h1 className="sr-only-h1">Performance Therapy Institute: physical therapy in Brentwood, Nashville and Nolensville, TN</h1>

      {/* Background slides */}
      <AnimatePresence>
        <motion.img
          key={i}
          src={s.image}
          alt={s.alt}
          width={2000}
          height={1333}
          fetchPriority={i === 0 ? 'high' : 'auto'}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: s.position }}
          initial={{ opacity: started.current ? 0 : 1, scale: 1 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1.12 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1 }, scale: { duration: DURATION / 1000 + 2, ease: 'easeOut' } }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/80 via-navy-deep/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep/60 via-transparent to-navy-deep/25" />

      {/* Text */}
      <div className="mx-auto w-full max-w-[88rem] px-4 pb-36 pt-36 md:px-8 md:pb-28">
        <div aria-live="off" className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={i} exit={{ opacity: 0, y: -16, transition: { duration: 0.35 } }}>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.14em] text-white/85 sm:text-xs md:text-sm md:tracking-[.22em]"
              >
                <span className="h-px w-10 bg-red" /> {s.eyebrow}
              </motion.p>

              <p role="presentation" className="font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[1.02] tracking-tight">
                {s.words.map((w, k) => (
                  <span key={w + k} className="mr-[.25em] inline-block overflow-hidden pb-[.12em] align-bottom">
                    <motion.span
                      className={`inline-block ${k === s.words.length - 1 ? 'italic text-[#FF7E86]' : ''}`}
                      initial={{ y: reduce ? 0 : '110%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.25 + k * 0.14, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mt-6 max-w-xl text-lg text-white/90 md:text-xl"
              >
                {s.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <a href={bookingUrl} className="btn btn-red">Book an Appointment</a>
                <a href="/conditions" className="btn btn-ghost-light">Explore What We Treat</a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-8 mx-auto flex w-full max-w-[88rem] items-center gap-5 px-4 md:px-8">
        <span className="font-display text-sm tabular-nums text-white/80" aria-hidden="true">0{i + 1} / 0{slides.length}</span>
        <div className="flex flex-1 gap-2 md:max-w-sm" role="group" aria-label="Choose slide">
          {slides.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Show slide ${k + 1}`}
              aria-current={k === i}
              onClick={() => go(k)}
              className="group h-6 flex-1 py-[10px]"
            >
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/30">
                {k === i && (
                  <motion.span
                    key={`${i}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: reduce ? '100%' : '0%' }}
                    animate={{ width: paused ? '0%' : '100%' }}
                    transition={{ duration: paused ? 0 : DURATION / 1000, ease: 'linear' }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="ml-auto hidden gap-2 md:flex">
          <button type="button" aria-label="Previous slide" onClick={() => go(i - 1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/50 hover:bg-white hover:text-navy">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(i + 1)} className="grid h-12 w-12 place-items-center rounded-full border border-white/50 hover:bg-white hover:text-navy">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
