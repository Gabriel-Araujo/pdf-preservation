
const dictionaries = {
    en: () => import('../dictionaries/en.json').then((module) => module.default),
    br: () => import('../dictionaries/br.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'br') => dictionaries[locale]()