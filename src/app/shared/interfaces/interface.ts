export interface Environment {
  apiKey: string;
  production: boolean;
  url: string;
  urlNewKey: string;
  newApiKey: string;
}

export type CategoriesType =
  | 'all'
  | 'regional'
  | 'technology'
  | 'lifestyle'
  | 'business'
  | 'general'
  | 'programming'
  | 'science'
  | 'entertainment'
  | 'world'
  | 'sports'
  | 'finance'
  | 'academia'
  | 'politics'
  | 'health'
  | 'opinion'
  | 'food'
  | 'game'
  | 'fashion'
  | 'academic'
  | 'travel'
  | 'culture'
  | 'economy'
  | 'environment'
  | 'art'
  | 'music'
  | 'CS'
  | 'education'
  | 'television'
  | 'commodity'
  | 'movie'
  | 'entrepreneur'
  | 'review'
  | 'auto'
  | 'energy'
  | 'celebrity'
  | 'medical'
  | 'gadgets'
  | 'design'
  | 'security'
  | 'mobile'
  | 'estate'
  | 'funny';

export type categoriesInfo = {
  id: CategoriesType;
  title: string;
};

export interface newsData {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string[];
  published: string;
}

export interface newKey {
  id: number;
  token: string;
}
