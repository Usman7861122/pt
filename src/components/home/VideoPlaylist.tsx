import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Video = { src: string; poster: string; title: string; text?: string; length?: string };

const pad = (n: number) => String(n).padStart(2, '0');

export default function VideoPlaylist({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const v = videos[active];

  useEffect(() => {
    if (playing) ref.current?.play().catch(() => {});
  }, [playing, active]);

  if (!v) return null;
  const pick = (k: number) => { setActive(k); setPlaying(true); };
  const next = () => pick((active + 1) % videos.length);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
      <div className="order-2 lg:order-1">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-gold">Now playing · {pad(active + 1)}/{pad(videos.length)}</p>
        <AnimatePresence mode="wait">
          <motion.div key={v.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <h3 className="font-display mt-2 text-3xl leading-tight md:text-4xl">{v.title}</h3>
            {v.text && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/70">{v.text}</p>}
          </motion.div>
        </AnimatePresence>

        <ul className="mt-8 grid grid-cols-4 gap-3 md:gap-4" role="list">
          {videos.map((it, k) => {
            const on = k === active;
            return (
              <li key={it.src}>
                <button type="button" onClick={() => pick(k)} aria-current={on} aria-label={`Play video: ${it.title}`} className={`group relative block aspect-[9/16] w-full overflow-hidden rounded-lg bg-navy-deep text-left transition-all duration-500 ${on ? 'ring-2 ring-gold ring-offset-2 ring-offset-navy' : 'opacity-80 ring-1 ring-white/15 hover:-translate-y-1 hover:opacity-100'}`}>
                  <img src={it.poster} alt="" loading="lazy" width={270} height={480} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/10 to-transparent" aria-hidden="true" />
                  <span className="absolute left-2 top-2 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white">{pad(k + 1)}{it.length ? ` · ${it.length}` : ''}</span>
                  <span className="absolute inset-x-2 bottom-2 text-[12px] font-medium leading-snug text-white md:text-[13px]">{it.title}</span>
                  {on && <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-gold text-navy-deep"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg></span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="order-1 mx-auto w-full max-w-[22rem] lg:order-2 lg:sticky lg:top-28">
        <div className="relative rounded-[26px] bg-navy-deep p-2 shadow-[0_60px_100px_-40px_rgba(0,0,0,.9)] ring-1 ring-white/20">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-black">
            <video
              ref={ref}
              key={v.src}
              src={playing ? v.src : undefined}
              poster={v.poster}
              playsInline
              controls={playing}
              onEnded={next}
              preload="none"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {!playing && (
              <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${v.title}`} className="group absolute inset-0 block w-full">
                <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/25" aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-red shadow-2xl transition-transform duration-500 group-hover:scale-110">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.6s]" aria-hidden="true" />
                  <svg className="relative ml-1" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="font-display absolute inset-x-5 bottom-5 block text-left text-xl leading-tight text-white">{v.title}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
