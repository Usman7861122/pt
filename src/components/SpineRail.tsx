import { useEffect, useState } from 'react';

// Scroll progress rail. Fed by site.homeSections.
export default function SpineRail({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -50% 0px' },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [sections]);
  return (
    <ul className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 gap-2 2xl:grid" aria-label="Page sections">
      {sections.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} aria-label={s.label} className={`block h-2 w-2 rounded-full ${active === s.id ? 'bg-brand' : 'bg-ink/30'}`} />
        </li>
      ))}
    </ul>
  );
}
