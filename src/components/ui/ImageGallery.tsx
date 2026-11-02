import { useState } from 'react';

export interface GalleryItem {
  imgUrl: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

export default function ImageGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(Math.floor(items.length / 2) - 1);

  return (
    <div
      className="flex h-[34rem] w-full flex-col gap-2 md:h-[30rem] md:flex-row lg:h-[34rem]"
      role="list"
      onMouseLeave={() => {}}
    >
      {items.map((it, k) => {
        const on = k === active;
        return (
          <button
            key={it.imgUrl}
            type="button"
            role="listitem"
            aria-label={`${it.subtitle ?? ''} ${it.title ?? it.alt}`.trim()}
            aria-pressed={on}
            onMouseEnter={() => setActive(k)}
            onFocus={() => setActive(k)}
            onClick={() => setActive(k)}
            style={{ flexGrow: on ? 7 : 1 }}
            className="group relative min-h-0 min-w-0 flex-shrink basis-0 overflow-hidden rounded-[10px] bg-navy text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)] outline-offset-4 transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          >
            <img
              src={it.imgUrl}
              alt={it.alt}
              loading="lazy"
              width={1000}
              height={1000}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${on ? 'scale-100 grayscale-0' : 'scale-110 grayscale-[.5]'}`}
            />
            <span className={`absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-60'}`} aria-hidden="true" />
            <span aria-hidden="true" className={`absolute inset-3 rounded-[6px] border border-white/40 transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} />
            <span className={`absolute inset-x-5 bottom-5 text-white transition-all duration-500 ${on ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-3 opacity-0'}`}>
              {it.subtitle && <span className="block text-xs uppercase tracking-[.22em] text-gold">{it.subtitle}</span>}
              {it.title && <span className="font-display mt-1 block text-2xl italic leading-tight md:text-3xl">{it.title}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
