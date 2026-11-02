// Detail pages for each clinic (/locations/<id>). Keyed by the ids in data/home.ts `locations`.
// Hours come from the old site (performnashville.com). TODO: confirm the provider lists and the Lymphedema hours with the clinic.
export type DayHours = { day: string; open?: [number, number]; close?: [number, number] }; // 24h [hour, minute]
type T = [number, number];

// Monday to Friday close times, all open at 7:00 AM. Weekends closed.
const week = (close: [T, T, T, T, T], open: T = [7, 0]): DayHours[] => [
  { day: 'Sunday' },
  ...['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => ({ day, open, close: close[i] })),
  { day: 'Saturday' },
];
const h = (n: number): T => [n, 0];

// 13 photos: 1 large (the building) + 12 small, so the grid fills evenly.
const brentwoodGallery = [
  '/images/brentwood/brentwood-23.webp', '/images/brentwood/brentwood-02.webp', '/images/brentwood/brentwood-05.webp', '/images/brentwood/brentwood-07.webp',
  '/images/brentwood/brentwood-09.webp', '/images/brentwood/brentwood-12.webp', '/images/brentwood/brentwood-14.webp', '/images/brentwood/brentwood-17.webp',
  '/images/brentwood/brentwood-21.webp', '/images/brentwood/brentwood-25.webp', '/images/brentwood/brentwood-people-04.webp',
  '/images/brentwood/brentwood-people-06.webp', '/images/brentwood/brentwood-people-09.webp',
];
const nolensvilleGallery = [
  '/images/nolensville/nolensville-03.webp', '/images/nolensville/nolensville-06.webp', '/images/nolensville/nolensville-07.webp', '/images/nolensville/nolensville-08.webp',
  '/images/nolensville/nolensville-09.webp', '/images/nolensville/nolensville-11.webp', '/images/nolensville/nolensville-13.webp', '/images/nolensville/nolensville-14.webp',
  '/images/nolensville/nolensville-17.webp', '/images/nolensville/nolensville-people-02.webp', '/images/nolensville/nolensville-people-03.webp', '/images/nolensville/nolensville-people-05.webp',
];

const allClinical = ['josh-colbert', 'kevin-robinson', 'rachel-morton', 'spence-tomlinson', 'ann-marie-wilson', 'casee-adams', 'craig-parker', 'jackson-boggs', 'hunter-boyd', 'nicholas-horne', 'amanda-diveley', 'abigail-king', 'hayley-fuller', 'katherine-rauch'];

export type Item = [title: string, href: string, text?: string];
export type LocationPage = {
  hero: string; heroAlt: string; hours: DayHours[]; gallery: string[];
  providers: string[]; // team slugs
  title?: string; accent?: string; // hero title override
  lede?: string; intro?: string;
  conditions?: Item[]; // override the default conditions list
  services?: Item[]; // override the default services list
  servicesTitle?: string;
  note?: string;
};

export const locationPages: Record<string, LocationPage> = {
  brentwood: {
    hero: '/images/brentwood/brentwood-23.webp',
    heroAlt: 'The front of the Performance Therapy Institute clinic in Brentwood, Tennessee',
    hours: week([h(19), h(18), h(17), h(19), h(17)]),
    gallery: brentwoodGallery,
    providers: allClinical,
  },
  nashville: {
    hero: '/images/coolsprings/coolsprings-people-13.webp', // TODO: replace with a photo of the Midtown clinic
    heroAlt: 'A therapist and patient working together in a one-on-one session',
    hours: week([h(18), h(18), h(18), h(18), h(17)]),
    gallery: [], // TODO: no photos of the Midtown clinic yet
    providers: allClinical,
  },
  nolensville: {
    hero: '/images/nolensville/nolensville-03.webp',
    heroAlt: 'The front of the Performance Therapy Institute clinic in Nolensville, Tennessee',
    hours: week([h(18), h(18), h(18), h(18), h(18)]),
    gallery: nolensvilleGallery,
    providers: allClinical,
  },
  lymphedema: {
    hero: '/images/conditions/breast-cancer-rehabilitation/breast-cancer-rehabilitation-hero.webp', // TODO: replace with a photo of Suite 125
    heroAlt: 'A therapist guiding a woman through an arm exercise during cancer rehabilitation',
    hours: week([h(18), h(18), h(18), h(18), h(17)]), // TODO: placeholder, copied from the old Cool Springs clinic
    gallery: [], // TODO: no photos of Suite 125 yet
    title: 'Lymphedema and', accent: 'cancer care',
    lede: 'Specialized therapy for swelling and recovery after cancer treatment, from certified lymphedema therapists at our Westgate Circle clinic in Brentwood.',
    intro: 'Our Lymphedema & Cancer Care clinic gives you a calm, private space for care that is built around your recovery.',
    conditions: [
      ['Lymphedema', '/conditions'],
      ['Breast Cancer Rehabilitation', '/conditions/breast-cancer-rehabilitation'],
      ['Swelling after lymph node removal', '/conditions/breast-cancer-rehabilitation'],
      ['Arm and shoulder stiffness after surgery', '/conditions/breast-cancer-rehabilitation'],
      ['Chronic Pain', '/conditions/chronic-pain'],
      ['Arthritis', '/conditions/arthritis'],
    ],
    servicesTitle: 'Lymphedema care at our',
    services: [
      ['Manual lymphatic drainage', '', 'A gentle massage that moves fluid out of swollen areas.'],
      ['Compression therapy', '', 'Bandages and garments that keep swelling down.'],
      ['Gentle exercise', '', 'Safe movement that helps lymph fluid flow.'],
      ['Patient and family education', '', 'Simple skills so you can care for yourself at home.'],
      ['Laser Therapy', '/services/laser-therapy', 'Soothe pain and speed healing'],
      ['Breast cancer rehabilitation', '/conditions/breast-cancer-rehabilitation', 'Regain motion and strength after treatment'],
    ],
    providers: ['katherine-rauch'], // CLT-LANA. TODO: add the other therapists who work in Suite 125
  },
};
