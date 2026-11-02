import { featuredReviews } from './testimonials';
export type NavChild = { label: string; href: string; desc?: string; external?: boolean };
export type NavItem = {
  label: string; href: string; children?: NavChild[];
  mega?: { title: string; text: string; image: string; cta: { label: string; href: string } };
};

export const site = {
  name: 'Performance Therapy Institute',
  tagline: 'Restore Movement. Relieve Pain. Reclaim Your Life.',
  description: 'Hands-on physical therapy in Brentwood, Nashville and Nolensville, TN. One-on-one care from licensed therapists since 2014.',
  phone: '615-465-6810',
  email: 'info@performnashville.com', // TODO confirm
  bookingUrl: '/#contact', // TODO: replace with online booking link (one link for every Book button)
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
        { label: 'Patient Forms', href: '/patient-info', desc: 'Forms, insurance and what to bring' },
        { label: 'Direct Access', href: '/patient-info/direct-access', desc: 'See a therapist without a referral' },
        { label: 'FAQs', href: '/faqs', desc: 'Quick answers before your visit' },
        { label: 'Pay My Bill', href: '/pay-my-bill', desc: 'Secure online payment portal' },
        { label: 'Referring Providers', href: 'https://performancetherapyinstitute.preferral.com/referral_wizard/1', desc: 'Send a referral online', external: true },
        { label: 'Reviews', href: '/testimonials', desc: 'What our patients say' },
      ],
    },
    {
      label: 'Locations', href: '/#locations',
      children: [
        { label: 'Brentwood', href: '/locations/brentwood', desc: '1646 Westgate Circle, Suite 106' },
        { label: 'Lymphedema & Cancer Care', href: '/locations/lymphedema', desc: '1624 Westgate Circle, Suite 125' },
        { label: 'Midtown Nashville', href: '/locations/nashville', desc: '1912 Charlotte Ave.' },
        { label: 'Nolensville', href: '/locations/nolensville', desc: '7227 Haley Industrial Drive, Suite 1200' },
      ],
    },
  ] as NavItem[],
  footerNav: [
    { label: 'About', href: '/about' }, { label: 'What We Treat', href: '/conditions' },
    { label: 'Services', href: '/services' }, { label: "Women's Health", href: '/womens-health' },
    { label: 'Our Team', href: '/team' }, { label: 'Blog', href: '/blog' },
    { label: 'Patient Info', href: '/patient-info' }, { label: 'Contact', href: '/#contact' },
  ],
  hours: 'Mon - Fri: 7:00 AM - 5:00 PM (some clinics stay open until 6 or 7 PM)',
};

export type Testimonial = { name: string; text: string };
export const testimonials: Testimonial[] = featuredReviews;

export type Post = { slug: string; title: string; excerpt: string; date: string; readTime: string; category: string; image: string; body?: string };
export const posts: Post[] = [
  // Titles and URLs come from the newer WordPress site. Excerpts and categories are drafts. TODO: confirm, and add real dates.
  { slug: 'i-have-hip-pain-should-i-rest-it-or-stay-active', title: 'I Have Hip Pain: Should I Rest It or Stay Active?', excerpt: 'Rest can help for a day or two. After that, gentle movement is often the faster way back. Here is how to tell the difference.', date: '2026-06-04', readTime: '', category: 'Hip pain', image: '/images/services/back-pain/back-pain-hero.webp' },
  { slug: 'can-an-acl-tear-heal-on-its-own', title: 'Can an ACL Tear Heal on Its Own?', excerpt: 'Some knees do well without surgery and some do not. Learn what decides the path and how therapy fits in.', date: '2026-06-03', readTime: '', category: 'Knee injuries', image: '/images/services/sports-injuries/sports-injuries-therapy.webp' },
  { slug: 'your-shoulder-pain-could-actually-be-a-neck-problem', title: 'Your Shoulder Pain Could Actually Be a Neck Problem', excerpt: 'Pain in the shoulder often starts in the neck. Here are the signs to look for and why it matters for treatment.', date: '2026-06-02', readTime: '', category: 'Neck and shoulder', image: '/images/services/neck-pain/neck-pain-hero.webp' },
  { slug: 'how-physical-therapy-can-improve-your-arthritis-symptoms-and-mobility', title: 'How Physical Therapy Can Improve Your Arthritis Symptoms and Mobility', excerpt: 'Moving more can hurt less. See how a guided plan eases stiff joints and keeps you doing what you love.', date: '2026-06-01', readTime: '', category: 'Arthritis', image: '/images/conditions/arthritis/arthritis-hero.webp' },
].sort((a, b) => b.date.localeCompare(a.date));
