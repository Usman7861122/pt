export type PressItem = {
  slug: string; title: string; deck: string; outlet: string; outletUrl: string; url: string;
  date: string; image: string; images: string[]; body: string[]; highlights: string[];
  quotes: string[]; conditions: string[]; services: string[];
};
// Summarize in our own words and link to the original. Never copy the article.
export const press: PressItem[] = [];
