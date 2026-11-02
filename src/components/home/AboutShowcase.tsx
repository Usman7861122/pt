import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Stat = { value: string; label: string };

const pillars = [
  { title: 'Hands-on', text: 'Every visit starts with skilled manual therapy.' },
  { title: 'One-on-one', text: 'Your therapist stays with you from start to finish.' },
  { title: 'Made for you', text: 'Care for children from age four, adults and seniors.' },
];

export default function AboutShowcase({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const bigX = useTransform(sx, [-1, 1], [-12, 12]);
  const bigY = useTransform(sy, [-1, 1], [-12, 12]);
  const smallX = useTransform(sx, [-1, 1], [26, -26]);
  const smallY = useTransform(sy, [-1, 1], [26, -26]);
  const badgeX = useTransform(sx, [-1, 1], [-18, 18]);
  const badgeY = useTransform(sy, [-1, 1], [-18, 18]);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section ref={ref} id="about" onPointerMove={onMove} data-spot className="section relative isolate overflow-hidden bg-cream text-navy">
      <div className="spot-dots text-navy/50" aria-hidden="true" />
      <div className="spot-glow" aria-hidden="true" />
      <p aria-hidden="true" className="font-display pointer-events-none absolute -left-6 top-6 -z-0 select-none text-[clamp(8rem,22vw,20rem)] italic leading-none text-navy/[.025]">Performance</p>

      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        {/* Image composition */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[36rem] pb-20 pr-6 lg:mx-0">
          <motion.div style={{ x: bigX, y: bigY }} className="relative w-[86%]">
            <div aria-hidden="true" className="absolute inset-0 translate-x-5 translate-y-5 rounded-[10px] border border-gold/80" />
            <img src="/images/brentwood/brentwood-people-12.webp" alt="Two physical therapists talking beside exercise equipment at the Brentwood clinic" width={900} height={900} loading="lazy" className="img-sq relative shadow-[0_40px_80px_-30px_rgba(20,33,61,.55)]" />
          </motion.div>
          <motion.div style={{ x: smallX, y: smallY }} className="absolute bottom-0 right-0 w-[46%]">
            <img src="/images/brentwood/brentwood-people-14.webp" alt="A therapist and patient during a one-on-one visit" width={600} height={600} loading="lazy" className="img-sq border-[6px] border-cream shadow-[0_30px_60px_-24px_rgba(20,33,61,.6)]" />
          </motion.div>
          <motion.div style={{ x: badgeX, y: badgeY }} className="absolute -right-2 top-4 h-32 w-32 md:h-36 md:w-36" aria-hidden="true">
            <div className="absolute inset-0 grid place-items-center rounded-full bg-navy text-center text-white shadow-xl">
              <div><p className="font-display text-3xl leading-none">2014</p><p className="mt-1 text-[10px] uppercase tracking-[.22em] text-white/70">Since</p></div>
            </div>
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite] text-gold motion-reduce:animate-none">
              <defs><path id="ring" d="M60,60 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" /></defs>
              <text fontSize="8.5" letterSpacing="3.2" fill="currentColor" fontWeight="600"><textPath href="#ring">PERFORMANCE THERAPY INSTITUTE · PERFORMANCE THERAPY ·</textPath></text>
            </svg>
          </motion.div>
        </motion.div>

        {/* Copy */}
        <div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="eyebrow">About Performance Therapy Institute</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.04] tracking-tight">
            Care that treats <em className="text-red">you</em>, not just your pain.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }} className="mt-7 max-w-xl text-xl leading-relaxed text-navy/80">
            We are a full-service physical therapy clinic with offices in Brentwood, Cool Springs, Midtown Nashville and Nolensville. Our doctors of physical therapy bring more than 100 years of combined experience to every visit.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.28 }} className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            We combine hands-on therapy, simple teaching and strengthening exercises, so you get stronger, move easier and lower your risk of falls. We accept most insurance plans.
          </motion.p>

          <ul className="mt-10 grid border-t border-navy/15 sm:grid-cols-3">
            {pillars.map((p, k) => (
              <motion.li key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 + k * 0.1 }}
                className="group relative border-b border-navy/15 py-6 pr-4 sm:border-b-0 sm:py-7 sm:[&:not(:last-child)]:border-r sm:[&:not(:first-child)]:pl-6">
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-0 bg-red transition-all duration-700 group-hover:w-full" />
                <h3 className="text-2xl font-medium">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </motion.li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-navy/15 bg-white/60 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-white hover:shadow-[0_20px_40px_-24px_rgba(20,33,61,.45)]">
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold to-red transition-transform duration-700 group-hover:scale-x-100" />
                <dd className="font-display text-4xl leading-none text-navy md:text-[2.6rem]">{s.value}</dd>
                <dt className="mt-3 border-t border-navy/10 pt-3 text-[11px] uppercase leading-snug tracking-[.14em] text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="/about" className="btn btn-navy">More About Us</a>
            <a href="/team" className="btn btn-ghost-dark">Meet our therapists
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
