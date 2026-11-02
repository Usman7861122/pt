export type ServiceContent = {
  photos: string[];
  intro: string;
  whatIs: { title: string; text: string[] };
  candidates: { title: string; text: string; conditions: string[]; symptoms: string[] };
  benefits: { title: string; text: string; items: string[] };
  recovery: { title: string; text: string; steps: { label: string; title: string; text: string }[] };
  safety: { title: string; text: string };
  faqs: { q: string; a: string }[];
};
export type Service = { slug: string; title: string; summary: string; image: string; content: ServiceContent };

const stub = (title: string): ServiceContent => ({
  photos: ['/images/placeholder.jpg', '/images/placeholder.jpg', '/images/placeholder.jpg'],
  intro: `Short intro about ${title}.`,
  whatIs: { title: `What is ${title}?`, text: ['Plain words. Short sentences.'] },
  candidates: { title: 'Is it right for you?', text: '', conditions: [], symptoms: [] },
  benefits: { title: 'Benefits', text: '', items: ['', '', '', ''] },
  recovery: { title: 'What to expect', text: '', steps: [{ label: 'Week 1', title: 'Start', text: '' }] },
  safety: { title: 'Safety', text: '' },
  faqs: [{ q: 'Sample question?', a: 'Sample answer.' }],
});

export const services: Service[] = [
  { slug: 'orthopedic-physical-therapy', title: 'Orthopedic Physical Therapy', summary: 'Bones, joints and muscles.', image: '/images/placeholder.jpg', content: stub('Orthopedic Physical Therapy') },
  { slug: 'sports-rehab', title: 'Sports Rehab', summary: 'Return to play safely.', image: '/images/placeholder.jpg', content: stub('Sports Rehab') },
  { slug: 'manual-therapy', title: 'Manual Therapy', summary: 'Hands-on pain relief.', image: '/images/placeholder.jpg', content: stub('Manual Therapy') },
  { slug: 'post-surgical-rehab', title: 'Post-Surgical Rehab', summary: 'Recover well after surgery.', image: '/images/placeholder.jpg', content: stub('Post-Surgical Rehab') },
];
