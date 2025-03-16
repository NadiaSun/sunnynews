export interface Environment {
    apiKey: string,
    production: boolean,
    url: string,
    urlNewKey: string,
    newApiKey: string
}

export type categories = 'sports' | 'all' | 'health' | 'technology' | 'business'

export type CATEGORIES = 'sports' | 'all' | 'health' | 'technology' | 'business';
export type categoriesInfo = {
    id: CATEGORIES,
    title: string
};

export interface newsData {
    id: string,
    title: string,
    description: string,
    url:  string,
    author: string
    image: string,
    language: string,
    category: string[],
    published: string
}

export interface newKey {
    id: number,
    token: string
}