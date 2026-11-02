export const localCity = 'Pasadena, CA';
export const localAreas = ['South Pasadena', 'San Marino', 'Altadena', 'Arcadia', 'Glendale', 'La Cañada Flintridge']; // TODO: client to review

export function localFor(topic: string, kind: 'service' | 'condition' | 'group') {
  return {
    city: localCity,
    eyebrow: localCity,
    banner: `${topic} in ${localCity}`,
    areas: localAreas,
    sectionTitle: `${topic} ${kind === 'condition' ? 'care' : 'treatment'} in ${localCity}`,
    text: [`We help people in ${localCity} and nearby areas with ${topic.toLowerCase()}.`],
  };
}
