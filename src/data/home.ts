export const heroSlides = [
  { image: '/images/nolensville/nolensville-09.webp', position: '50% 50%', alt: 'The Nolensville clinic treatment area with the Performance Therapy Institute logo on the wall',
    eyebrow: 'Since 2014', words: ['Reclaim', 'Your', 'Life.'],
    sub: 'From the first visit to full recovery, we stay with you.' },
  { image: '/images/brentwood/brentwood-02.webp', position: '50% 50%', alt: 'The open, bright therapy gym at our Brentwood clinic',
    eyebrow: 'One-on-one sessions', words: ['Relieve', 'Pain.'],
    sub: 'A plan built around your goals, not a fixed script.' },
  { image: '/images/coolsprings/coolsprings-people-07.webp', position: '50% 50%', alt: 'A therapist and a patient talking about the plan for recovery',
    eyebrow: 'Brentwood · Nashville · Nolensville', words: ['Restore', 'Movement.'],
    sub: 'Hands-on care from licensed therapists who listen first.' },
];

export const stats = [
  { value: '2014', label: 'Serving patients since' },
  { value: '3', label: 'Clinics near you' },
  { value: '100+', label: 'Years of combined experience' },
  { value: '4+', label: 'Patients age four and up' },
];

export const featuredConditions = [
  { slug: 'back-pain', title: 'Back Pain', image: '/images/services/back-pain/back-pain-hero.webp', alt: 'Therapist treating a patient with back pain',
    text: 'Gentle hands-on care and simple exercises to ease pain and help you stand, sit and lift with ease.' },
  { slug: 'neck-pain', title: 'Neck Pain', image: '/images/coolsprings/coolsprings-people-07.webp', alt: 'Therapist talking with a patient about neck pain',
    text: 'Relief for stiff necks and tension headaches, with tips to protect your neck at work and at home.' },
  { slug: 'shoulder-pain', title: 'Shoulder Pain', image: '/images/brentwood/brentwood-people-03.webp', alt: 'Therapist supporting a patient during shoulder rehab',
    text: 'Rebuild strength and reach after an injury, a tear or surgery, one safe step at a time.' },
  { slug: 'sports-injuries', title: 'Sports Injuries', image: '/images/brentwood/brentwood-12.webp', alt: 'Agility training area for athletes',
    text: 'Heal well, move well and get back to your sport with a plan made for your body and your game.' },
  { slug: 'laser-therapy', title: 'Laser Therapy', image: '/images/coolsprings/coolsprings-17.webp', alt: 'A quiet treatment room for laser therapy',
    text: 'A calm, drug-free treatment that helps calm pain and speed up healing in sore tissue.' },
  { slug: 'gait-balance', title: 'Gait and Balance', image: '/images/brentwood/brentwood-people-06.webp', alt: 'Patient practicing walking safely with a harness',
    text: 'Walk with more confidence. We train your balance and strength to lower your risk of falls.' },
];

// Home page "Therapy services" cards. Photos are licensed Shutterstock images (Standard license):
// laser 1384809167, shockwave 2246192101, sports 4210324687, knee 2381514323, shoulder 2735494675, gait 2067235808.
export const featuredServices = [
  { slug: 'shoulder-pain', title: 'Shoulder Pain', image: '/images/services/shoulder-pain.webp', alt: 'A therapist gently lifts a patient’s arm to check shoulder motion',
    text: 'Find the cause, calm the pain and win back your reach with hands-on care and smart exercises.' },
  { slug: 'sports-injuries', title: 'Sports Injuries', image: '/images/services/sports-injuries.webp', alt: 'A man treating his ankle during sports injury rehab',
    text: 'A clear plan to heal well, move well and get back to your sport with strength and confidence.' },
  { slug: 'laser-therapy', title: 'Laser Therapy', image: '/images/services/laser-therapy.webp', alt: 'A therapist in gloves using a laser device on a patient’s knee',
    text: 'A gentle, drug-free light treatment that helps calm pain and speed up healing in sore tissue.' },
  { slug: 'extracorporeal-shock-wave-therapy', title: 'Shock Wave Therapy', image: '/images/services/shockwave-therapy.webp', alt: 'A therapist using a shock wave applicator on a patient’s shoulder',
    text: 'Sound waves that target stubborn pain and help tired tendons and muscles heal.' },
  { slug: 'knee-pain', title: 'Knee Pain', image: '/images/services/knee-pain.webp', alt: 'A therapist guiding a patient’s knee through a gentle stretch',
    text: 'Walk, climb stairs and squat with less pain, using care built around your knee and your goals.' },
  { slug: 'gait-and-balance-disorder', title: 'Gait and Balance', image: '/images/services/gait-balance.webp', alt: 'A therapist helping a patient practice walking with a walker',
    text: 'Walk with more confidence. We train balance and strength to lower your risk of falls.' },
];

export const team = [
  { name: 'Josh Colbert', title: 'DPT, Cert. MDT', photo: '/images/team/josh-colbert.webp' },
  { name: 'Kevin Robinson', title: 'MPT, OCS, DSc', photo: '/images/team/kevin-robinson.webp' },
  { name: 'Rachel Morton', title: 'PT, DPT', photo: '/images/team/rachel-morton.webp' },
  { name: 'Spence Tomlinson', title: 'PT, DPT', photo: '/images/team/spence-tomlinson.webp' },
  { name: 'Ann Marie Wilson', title: 'PT, DPT', photo: '/images/team/ann-marie-wilson.webp' },
  { name: 'Abigail King', title: 'M.S., CCC-SLP', photo: '/images/team/abigail-king.webp' },
] as { name: string; title: string; photo?: string }[]; // TODO: add headshots, set `photo`

export const gallery = [
  { src: '/images/brentwood/brentwood-02.webp', alt: 'The bright, open therapy floor at our Brentwood clinic', place: 'Brentwood', caption: 'An open floor made for movement', big: true },
  { src: '/images/brentwood/brentwood-people-05.webp', alt: 'A therapist helping a patient walk with support', place: 'Brentwood', caption: 'Safe, supported steps' },
  { src: '/images/nolensville/nolensville-14.webp', alt: 'Performance Therapy Institute logo wall in Nolensville', place: 'Nolensville', caption: 'Welcome to Nolensville' },
  { src: '/images/nolensville/nolensville-07.webp', alt: 'The Nolensville clinic floor with treatment tables and equipment', place: 'Nolensville', caption: 'Room to heal and grow', big: true, right: true },
  { src: '/images/brentwood/brentwood-23.webp', alt: 'Front of the Brentwood clinic', place: 'Brentwood', caption: 'Our Brentwood clinic' },
  { src: '/images/brentwood/brentwood-people-16.webp', alt: 'Two therapists talking beside exercise equipment', place: 'Brentwood', caption: 'Teamwork in every visit' },
  { src: '/images/nolensville/nolensville-13.webp', alt: 'Treatment tables at the Nolensville clinic', place: 'Nolensville', caption: 'Private treatment spaces' },
];

export const insurance = [
  { name: 'Aetna Dental', logo: '/images/insurance/aetna.png' },
  { name: 'Blue Cross Blue Shield', logo: '/images/insurance/bcbs.png' },
  { name: 'Alliance Healthcare', logo: '/images/insurance/alliance.png' },
  { name: 'Fortified Provider Network', logo: '/images/insurance/az23.png' },
  { name: 'Health Monitor', logo: '/images/insurance/healthmonitor.png' },
  { name: 'Health One', logo: '/images/insurance/healthone.png' },
  { name: 'Evolutions Healthcare Systems', logo: '/images/insurance/logo420.png' },
  { name: 'Ameriplan', logo: '/images/insurance/pngegg.png' },
];

export const locations = [
  { id: 'brentwood', name: 'Brentwood', address: '1646 Westgate Circle, Suite 106', city: 'Brentwood, TN 37027', phone: '615-465-6810', fax: '615-465-6817', image: '/images/brentwood/brentwood-23.webp', hours: 'Mon & Thu 7 AM – 7 PM · Tue 7 AM – 6 PM · Wed & Fri 7 AM – 5 PM' },
  // The Cool Springs clinic (Suite 175) closed. Suite 125 is a new lymphedema and cancer care location. TODO: confirm its phone, fax and hours (using the Brentwood main line for now) and add a photo.
  { id: 'lymphedema', name: 'Lymphedema & Cancer Care', address: '1624 Westgate Circle, Suite 125', city: 'Brentwood, TN 37027', phone: '615-465-6810', fax: '615-465-6817', image: '/images/coolsprings/coolsprings-25.webp', hours: 'Mon – Thu 7 AM – 6 PM · Fri 7 AM – 5 PM' },
  { id: 'nashville', name: 'Midtown Nashville', address: '1912 Charlotte Ave.', city: 'Nashville, TN 37203', phone: '615-285-4088', fax: '615-375-9092', image: '/images/brentwood/brentwood-12.webp', hours: 'Mon – Thu 7 AM – 6 PM · Fri 7 AM – 5 PM' },
  { id: 'nolensville', name: 'Nolensville', address: '7227 Haley Industrial Drive, Suite 1200', city: 'Nolensville, TN 37135', phone: '615-278-9869', fax: '615-439-2865', image: '/images/nolensville/nolensville-03.webp', hours: 'Mon – Fri 7 AM – 6 PM' },
];

export const womensAreas = [
  { title: 'Pregnancy care', image: '/images/coolsprings/coolsprings-people-08.webp', alt: 'A therapist at her laptop planning a patient’s care',
    text: 'Gentle support for back, hip and pelvic aches, plus safe exercises for each stage of pregnancy.' },
  { title: 'Postpartum recovery', image: '/images/coolsprings/coolsprings-people-02.webp', alt: 'A therapist reviewing a recovery plan at a table',
    text: 'Rebuild core strength and ease back into daily life at a pace that is right for your body.' },
  { title: 'Pelvic health', image: '/images/coolsprings/coolsprings-people-16.webp', alt: 'Two therapists reviewing a care plan together',
    text: 'Private, caring treatment for pelvic pain, bladder control and core support.' },
  { title: 'Chronic pain', image: '/images/coolsprings/coolsprings-people-07.webp', alt: 'A therapist talking with a patient about her pain',
    text: 'A calm, step-by-step plan to lower pain and help you do more of what you love.' },
];
