// Video playlist for the homepage. Files live in public/videos (vertical 540x960 MP4 + poster JPG).
// Titles are drafts based on what each clip shows. TODO: confirm names with the clinic.
export type Video = { src: string; poster: string; title: string; text?: string; length?: string };

const v = (n: number, title: string, text: string, length: string): Video => ({ src: `/videos/v${n}.mp4`, poster: `/videos/v${n}.jpg`, title, text, length });

export const videos: Video[] = [
  v(1, 'Dry needling for the shoulder', 'Thin needles release tight muscle and help calm deep pain.', '0:07'),
  v(2, 'Seated hip rotation', 'A floor drill that opens the hips and builds control.', '0:27'),
  v(3, 'Manual therapy for the arm', 'Gentle, hands-on work to ease pain and restore movement.', '0:25'),
  v(4, 'Hands-on wrist and arm mobilization', 'Your therapist guides the joint through safe, easy motion.', '0:22'),
  v(5, 'Handheld therapy for the ankle', 'A targeted treatment to calm sore tissue and support healing.', '0:15'),
  v(6, 'Kneeling balance with support', 'Your therapist guides you through a safe balance challenge.', '0:05'),
  v(7, 'Suspension row', 'Build back and shoulder strength with body-weight control.', '0:04'),
  v(8, 'Suspension ring press', 'A strong core and shoulder drill using gym rings.', '0:05'),
];
