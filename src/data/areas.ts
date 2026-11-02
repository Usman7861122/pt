// Local landing-page info for each clinic (used by condition pages like /conditions/als/brentwood).
// TODO: confirm the nearby town lists with the clinic.
export const areas: Record<string, { city: string; state: string; nearby: string[]; area: string }> = {
  brentwood: { city: 'Brentwood', state: 'TN', nearby: ['Franklin', 'Cool Springs', 'Oak Hill', 'Forest Hills', 'Nolensville'], area: 'the greater Williamson County area' },
  nashville: { city: 'Nashville', state: 'TN', nearby: ['Music Row', 'The Gulch', 'West End', 'Germantown', 'Belmont'], area: 'the greater Davidson County area' },
  nolensville: { city: 'Nolensville', state: 'TN', nearby: ['Franklin', 'Arrington', 'Antioch', 'Brentwood', 'Thompson’s Station'], area: 'the greater Williamson County area' },
};
