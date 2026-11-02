import { useState } from 'react';

type Item = { slug: string; title: string; image: string; alt: string; text: string };

export default function ConditionsFlip({ items, base = 'conditions' }: { items: Item[]; base?: string }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => {
        const flipped = open === c.slug;
        return (
          <li key={c.slug} className="group [perspective:1200px]">
            <div
              className={`relative aspect-square transition-transform duration-700 ease-out [transform-style:preserve-3d] motion-reduce:transition-none lg:group-hover:[transform:rotateY(180deg)] ${
                flipped ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              {/* Front */}
              <div className="absolute inset-0 overflow-hidden rounded-[10px] [backface-visibility:hidden]">
                <img src={c.image} alt={c.alt} loading="lazy" width={800} height={800} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-6 text-3xl font-medium text-white">{c.title}</h3>
                <button
                  type="button"
                  aria-expanded={flipped}
                  aria-label={`${c.title}: show details`}
                  onClick={() => setOpen(flipped ? null : c.slug)}
                  className="absolute inset-0 lg:hidden"
                />
                <span className="absolute right-4 top-4 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">Learn more</span>
              </div>

              {/* Back */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-[10px] bg-navy p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-9">
                <div>
                  <span className="mb-4 block h-1 w-10 bg-red" />
                  <h3 className="text-3xl font-medium">{c.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{c.text}</p>
                </div>
                <a href={`/${base}/${c.slug}`} className="btn btn-red self-start" tabIndex={flipped ? 0 : undefined}>
                  Learn more
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
