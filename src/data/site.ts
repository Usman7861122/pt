export type NavChild = { label: string; href: string; desc?: string; external?: boolean };
export type NavItem = {
  label: string; href: string; children?: NavChild[];
  mega?: { title: string; text: string; image: string; cta: { label: string; href: string } };
};

export const site = {
  name: 'Performance Therapy Institute',
  tagline: 'Restore Movement. Relieve Pain. Reclaim Your Life.',
  description: 'Hands-on physical therapy in Brentwood, Cool Springs, Nashville and Nolensville, TN. One-on-one care from licensed therapists since 2014.',
  phone: '615-465-6810',
  email: 'info@performnashville.com', // TODO confirm
  bookingUrl: '/contact', // TODO: replace with online booking link (one link for every Book button)
  contactApi: '/api/contact',
  social: { facebook: '#', instagram: '#', youtube: '#', x: '#' }, // TODO real links
  // Menu structure follows the newer WordPress site. Pages marked TODO are not built yet.
  nav: [
    {
      label: 'About', href: '/about',
      children: [
        { label: 'Our Team', href: '/team', desc: 'Meet the therapists who will care for you' },
        { label: 'Join Our Team', href: '/about/join-our-team', desc: 'See open roles and why people stay' }, // TODO page
      ],
    },
    {
      label: 'What We Treat', href: '/conditions',
      mega: { title: 'What we treat', text: 'From everyday aches to long-term conditions, we build a plan around you.', image: '/images/brentwood/brentwood-people-09.webp', cta: { label: 'See all conditions', href: '/conditions' } },
      children: ([
        ['ALS', 'Keep strength and independence'], ['Ankle Pain', 'Sprains, stiffness and weak ankles'],
        ['Arthritis', 'Ease sore, stiff joints'], ['Back Pain', 'Relief for the upper and lower back'],
        ['Balance Disorders', 'Steadier steps, fewer falls'], ['Breast Cancer Rehabilitation', 'Regain motion after treatment'],
        ['Chronic Pain', 'A plan for pain that lingers'], ['Dizziness', 'Calm the spinning and unsteadiness'],
        ['Elbow Pain', 'Tennis and golfer elbow care'], ['Fibromyalgia', 'Gentle movement for daily comfort'],
        ['Multiple Sclerosis', 'Build strength and endurance'],
      ] as [string, string][]).map(([l, d]) => ({ label: l, desc: d, href: `/conditions/${l.toLowerCase().replace(/ /g, '-')}` })),
    },
    {
      label: 'Therapy Services', href: '/services',
      mega: { title: 'Therapy services', text: 'Hands-on care and proven tools, matched to your goals.', image: '/images/nolensville/nolensville-people-03.webp', cta: { label: 'See all services', href: '/services' } },
      children: ([
        ['Shoulder Pain', 'Rotator cuff and mobility care'], ['Sports Injuries', 'Safe return to your game'],
        ['Laser Therapy', 'Soothe pain and speed healing'], ['Knee Pain', 'Walk, climb and squat with ease'],
        ['Back Pain', 'Hands-on care for your spine'], ['Neck Pain', 'Loosen tight, achy necks'],
        ['Extracorporeal Shock Wave Therapy', 'Sound waves for stubborn pain'], ['Gait and Balance Disorder', 'Walk with more confidence'],
      ] as [string, string][]).map(([l, d]) => ({ label: l, desc: d, href: `/services/${l.toLowerCase().replace(/ /g, '-')}` })),
    },
    { label: "Women's Health", href: '/womens-health' },
    {
      label: 'Health Tips', href: '/blog',
      children: [
        { label: 'Blog', href: '/blog', desc: 'Simple advice from our therapists' },
        { label: 'Video', href: '/video', desc: 'Exercises and tips to watch' }, // TODO page
      ],
    },
    {
      label: 'Patient Info', href: '/patient-info',
      children: [
        { label: 'Direct Access', href: '/patient-info/direct-access', desc: 'See a therapist without a referral' }, // TODO page
        { label: 'FAQs', href: '/faqs', desc: 'Quick answers before your visit' }, // TODO page
        { label: 'Referring Providers', href: 'https://performancetherapyinstitute.preferral.com/referral_wizard/1', desc: 'Send a referral online', external: true },
        { label: 'Reviews', href: '/testimonials', desc: 'What our patients say' },
      ],
    },
    { label: 'Contact', href: '/contact' },
  ] as NavItem[],
  footerNav: [
    { label: 'About', href: '/about' }, { label: 'What We Treat', href: '/conditions' },
    { label: 'Services', href: '/services' }, { label: "Women's Health", href: '/womens-health' },
    { label: 'Our Team', href: '/team' }, { label: 'Blog', href: '/blog' },
    { label: 'Patient Info', href: '/patient-info' }, { label: 'Contact', href: '/contact' },
  ],
  hours: 'Mon - Fri: 8:00 AM - 5:00 PM', // TODO confirm with client
};

export type Testimonial = { name: string; text: string };
export const testimonials: Testimonial[] = [
  { name: 'Rebecca K.', text: 'Best physical therapy place around town.' },
  { name: 'Kelley L.', text: 'Josh is the best physical therapist I have ever worked with!' },
  { name: 'April B.', text: 'Performance Therapy Institute is a hidden gem for sure!' },
  { name: 'Dan W.', text: 'Josh and the team at Performance Therapy Institute are simply amazing.' },
  { name: 'Angela A.', text: 'Knowledgeable, personable, & encouraging!' },
];

export type Post = { slug: string; title: string; excerpt: string; date: string; readTime: string; category: string; image: string; body?: string };
export const posts: Post[] = [
  // Titles and URLs come from the newer WordPress site. Excerpts and categories are drafts. TODO: confirm, and add real dates.
  { slug: 'i-have-hip-pain-should-i-rest-it-or-stay-active', title: 'I Have Hip Pain: Should I Rest It or Stay Active?', excerpt: 'Rest can help for a day or two. After that, gentle movement is often the faster way back. Here is how to tell the difference.', date: '2026-06-04', readTime: '', category: 'Hip pain', image: '/images/brentwood/brentwood-11.webp' },
  { slug: 'can-an-acl-tear-heal-on-its-own', title: 'Can an ACL Tear Heal on Its Own?', excerpt: 'Some knees do well without surgery and some do not. Learn what decides the path and how therapy fits in.', date: '2026-06-03', readTime: '', category: 'Knee injuries', image: '/images/coolsprings/coolsprings-09.webp' },
  { slug: 'your-shoulder-pain-could-actually-be-a-neck-problem', title: 'Your Shoulder Pain Could Actually Be a Neck Problem', excerpt: 'Pain in the shoulder often starts in the neck. Here are the signs to look for and why it matters for treatment.', date: '2026-06-02', readTime: '', category: 'Neck and shoulder', image: '/images/nolensville/nolensville-08.webp' },
  { slug: 'how-physical-therapy-can-improve-your-arthritis-symptoms-and-mobility', title: 'How Physical Therapy Can Improve Your Arthritis Symptoms and Mobility', excerpt: 'Moving more can hurt less. See how a guided plan eases stiff joints and keeps you doing what you love.', date: '2026-06-01', readTime: '', category: 'Arthritis', image: '/images/brentwood/brentwood-17.webp' },
].sort((a, b) => b.date.localeCompare(a.date));
