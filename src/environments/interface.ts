export interface Environment {
    apiKey: string,
    production: boolean,
    url: string
}

export type categories = 'sports' | 'all' | 'health' | 'technology' | 'business'

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