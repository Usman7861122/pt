import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Area = { title: string; text: string; image: string; alt: string };

export default function WomensShowcase({ areas }: { areas: Area[] }) {
  const [active, setActive] = useState(0);
  const a = areas[active];
  const [wide, setWide] = useState(false);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  // On large screens the photo stays fixed; scrolling the list changes the active area.
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    setWide(true);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.k)); }),
      { rootMargin: '-40% 0px -50% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="womens-health" className="section relative isolate overflow-clip bg-blush text-navy">
      <p aria-hidden="true" className="font-display pointer-events-none absolute -bottom-16 -right-8 -z-0 select-none text-[clamp(9rem,24vw,22rem)] italic leading-none text-navy/[.03]">Women</p>
      <div className="absolute -right-40 -top-40 -z-0 h-[34rem] w-[34rem] rounded-full bg-red/[.07] blur-3xl" aria-hidden="true" />

      <div className="container-x relative z-10 grid items-start gap-14 lg:grid-cols-[1fr_1.02fr] lg:gap-24">
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="eyebrow">Women's Health</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="mt-5 text-[clamp(2.4rem,4.6vw,4.2rem)] font-medium leading-[1.06] tracking-tight">
            Helping women move better, feel better, and <em className="text-red">live better.</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.8 }} className="mt-6 max-w-lg text-lg leading-relaxed text-navy/75">
            Care through every stage of life, with a plan made just for you and one-on-one time with your therapist.
          </motion.p>

          <ul className="mt-10 border-b border-navy/15" role="list">
            {areas.map((it, k) => {
              const on = k === active;
              return (
                <li key={it.title} ref={(el) => { refs.current[k] = el; }} data-k={k} className="border-t border-navy/15">
                  <button
                    type="button"
                    aria-expanded={on}
                    onMouseEnter={() => setActive(k)}
                    onFocus={() => setActive(k)}
                    onClick={() => setActive(k)}
                    className="group relative flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span aria-hidden="true" className={`absolute left-0 top-0 h-px bg-red transition-all duration-700 ${on ? 'w-full' : 'w-0'}`} />
                    <span className={`font-display text-[1.75rem] transition-all duration-500 md:text-[2rem] ${on ? 'translate-x-2 text-navy' : 'text-navy/55 group-hover:text-navy/80'}`}>{it.title}</span>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? 'rotate-[-45deg] border-red bg-red text-white' : 'border-navy/25 text-navy'}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {(on || wide) && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className={`overflow-hidden pl-2 pr-16 text-[15px] leading-relaxed transition-colors duration-500 ${on ? 'text-navy/75' : 'text-navy/35'}`}>
                        <span className="block pb-6">{it.text}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          <a href="/womens-health" className="btn btn-red mt-10">Explore Women's Health</a>
        </div>

        <div className="relative mx-auto w-full max-w-[36rem] pb-8 pr-8 lg:sticky lg:top-28 lg:mx-0">
          <div aria-hidden="true" className="absolute bottom-0 right-0 top-8 w-[calc(100%-2rem)] rounded-[10px] border border-gold/70" />
          <div className="relative overflow-hidden rounded-[10px] shadow-[0_50px_90px_-40px_rgba(20,33,61,.6)]">
            <AnimatePresence mode="sync">
              <motion.img key={a.image} src={a.image} alt={a.alt} width={900} height={900} loading="lazy" className="img-sq absolute inset-0 !rounded-none" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
            </AnimatePresence>
            <div className="aspect-square" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/70 to-transparent p-6 pt-24 text-white">
              <p className="text-xs uppercase tracking-[.22em] text-white/75">Care for every stage</p>
              <AnimatePresence mode="wait">
                <motion.p key={a.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="font-display mt-1 text-3xl italic">{a.title}</motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
