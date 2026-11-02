export type ConditionContent = {
  photos: string[];
  intro: string;
  overview: string;
  causes: { items: string[] };
  symptoms: { items: string[]; redFlags: string[] };
  diagnosis: { steps: string[] };
  treatment: { nonSurgical: string[]; surgical: string[] };
  livingWell: { tips: string[] };
  faqs: { q: string; a: string }[];
  relatedServices: string[]; // max 3
};
export type Condition = { slug: string; group: string; title: string; summary: string; image: string; content: ConditionContent };

const stub = (title: string): ConditionContent => ({
  photos: ['/images/placeholder.jpg', '/images/placeholder.jpg', '/images/placeholder.jpg'],
  intro: `Short intro about ${title}.`,
  overview: '',
  causes: { items: [] },
  symptoms: { items: [], redFlags: [] },
  diagnosis: { steps: [] },
  treatment: { nonSurgical: [], surgical: [] },
  livingWell: { tips: [] },
  faqs: [],
  relatedServices: ['back-pain'],
});

export const conditionGroups = [
  { slug: 'back-neck', title: 'Back and Neck' },
  { slug: 'knee-hip', title: 'Knee and Hip' },
  { slug: 'shoulder-arm', title: 'Shoulder and Arm' },
];

export const conditions: Condition[] = [
  { slug: 'low-back-pain', group: 'back-neck', title: 'Low Back Pain', summary: '', image: '/images/placeholder.jpg', content: stub('Low Back Pain') },
  { slug: 'knee-pain', group: 'knee-hip', title: 'Knee Pain', summary: '', image: '/images/placeholder.jpg', content: stub('Knee Pain') },
  { slug: 'rotator-cuff-injury', group: 'shoulder-arm', title: 'Rotator Cuff Injury', summary: '', image: '/images/placeholder.jpg', content: stub('Rotator Cuff Injury') },
];
