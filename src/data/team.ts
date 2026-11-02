import bios from './team-bios.json';

export type Profile = {
  slug: string; name: string; title: string; photo: string; role: string; group: 'clinical' | 'office';
  intro: string; bio: string[];
  storyHead: [string, string];
  timeline?: { year: string; label: string; text: string }[];
  focus?: { label: string; href: string; d: string }[];
  quotes?: { name: string; text: string }[];
  rich?: boolean; // show clinic photos + videos
};

// Bios, names and photos come from the WordPress team page. Intros and layout copy are drafts. TODO: confirm with the clinic.
const intros: Record<string, string> = {
  'josh-colbert': 'More than 20 years of outpatient orthopedic physical therapy, and a McKenzie-certified eye for what is really causing your pain.',
  'kevin-robinson': 'The first certified orthopedic physical therapy specialist in middle Tennessee, who also teaches the next generation of therapists.',
  'rachel-morton': 'Chronic pain, balance and neurological care, delivered with joy and ease of movement in mind.',
  'spence-tomlinson': 'Whole-patient care: the source of your pain, plus sleep, stress, diet and exercise.',
  'ann-marie-wilson': 'Personal, one-on-one orthopedic care for athletes, performers and everyone in between.',
  'casee-adams': 'Outpatient orthopedics with dry needling and McKenzie training.',
  'craig-parker': 'Orthopedic physical therapy grounded in research on injury risk and human performance.',
  'jackson-boggs': 'A physical therapist and strength coach who helps you reach your best level of function.',
  'hunter-boyd': 'A Nashville native caring for patients at every stage of life.',
  'nicholas-horne': 'A former massage therapist and ultramarathoner who knows what it takes to keep moving.',
  'amanda-diveley': '16 years of experience, from acute hospital care to elite athletes.',
  'abigail-king': 'Speech therapy for swallowing, voice and communication, including LSVT LOUD for Parkinson’s disease.',
  'hayley-fuller': 'Compassionate pelvic health care, from pregnancy and postpartum to pelvic pain.',
  'katherine-rauch': 'Occupational therapy for lymphedema, cancer rehabilitation and neurological conditions.',
  'donni-chandler': 'Helping patients with scheduling and insurance benefits at our Nashville clinic.',
  'ethan-newman': 'Coordinating patient care at our Nashville clinic.',
  'kelly-cashman': 'Helping patients find their way through the health care system.',
  'lauren-mcconnell': 'Billing specialist who has been part of the team since 2019.',
};

const detail: Record<string, Partial<Profile>> = {
  'josh-colbert': {
    rich: true,
    storyHead: ['From Port St. Joe to', 'Nashville.'],
    timeline: [
      { year: '1998', label: 'B.S. in Biology', text: 'Belmont University, Nashville' },
      { year: '2001', label: 'Doctor of Physical Therapy', text: 'Belmont University' },
      { year: '2011', label: 'Cert. MDT', text: 'McKenzie Institute, New Zealand' },
      { year: 'Today', label: 'Outpatient orthopedics', text: 'Yearly post-graduate training' },
    ],
    focus: [
      { label: 'Back pain', href: '/conditions/back-pain', d: 'Find the movements that ease it, and keep it from coming back.' },
      { label: 'Neck pain', href: '/conditions/neck-pain', d: 'Calm stiffness and headaches that start in the neck.' },
      { label: 'Shoulder pain', href: '/conditions/shoulder-pain', d: 'Restore smooth, strong motion for work and play.' },
      { label: 'Knee pain', href: '/conditions/knee-pain', d: 'Build support around the joint so you can walk, climb and run.' },
      { label: 'Sciatica', href: '/conditions/sciatica-pain', d: 'Ease pain that shoots down the leg with a clear, simple plan.' },
      { label: 'Sports injuries', href: '/conditions/sports-injuries', d: 'Heal well and get back to your game.' },
    ],
    quotes: [
      { name: 'Kelley L.', text: 'Josh is the best physical therapist I have ever worked with!' },
      { name: 'Dan W.', text: 'Josh and the team at Performance Therapy Institute are simply amazing.' },
    ],
  },
};

export const profiles: Profile[] = (bios as any[]).map((b) => ({
  slug: b.slug, name: b.name, title: b.title, photo: b.photo, role: b.role, group: b.group,
  intro: intros[b.slug] ?? '', bio: b.bio,
  storyHead: ['About', b.name.split(' ')[0] + '.'],
  ...(detail[b.slug] ?? {}),
}));
