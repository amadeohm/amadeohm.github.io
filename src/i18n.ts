export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];
export type Page = 'home' | 'research' | 'thesis' | 'bachelorThesis' | 'blog';

const slugs: Record<Locale, Record<Page, string>> = {
  en: { home: '', research: 'research', thesis: 'research/predig', bachelorThesis: 'research/dental-bone-loss', blog: 'blog' },
  es: { home: '', research: 'investigacion', thesis: 'investigacion/predig', bachelorThesis: 'investigacion/dental-bone-loss', blog: 'blog' },
};

export function pathFor(locale: Locale, page: Page) {
  const slug = slugs[locale][page];
  return `/${locale}/${slug ? `${slug}/` : ''}`;
}

export const ui = {
  en: {
    home: 'About', research: 'Research', thesis: "Master’s thesis", blog: 'Writing',
    bachelorThesis: 'Bachelor’s thesis',
    skip: 'Skip to content', navigation: 'Main navigation', language: 'Language',
    selected: 'Selected research', read: 'Read about this work', contact: 'Contact',
    cv: 'CV', thesisPdf: 'Thesis PDF', code: 'Code',
    supervision: 'Supervised by', author: 'Author', programme: 'Programme',
    backResearch: 'All research', backBlog: 'All writing',
    thesisSubtitle: 'Tracing Shannon’s footprints across self-supervised learning',
    thesisTitle: 'On probabilistic prediction and information-theoretic operators',
    thesisSummary: 'Can we identify which observations will reduce predictive uncertainty before incorporating them into a model? An investigation of predictive information gain in Bayesian linear regression and probabilistic principal component analysis.',
    researchIntro: 'I am interested in the foundations of machine learning, particularly Bayesian methods and their connections to information theory. My interests also include self-supervised learning, continual learning, reinforcement learning, computer vision, and multi-agent systems.',
    blogIntro: 'Welcome! Here I share a small collection of research notes, reflections, occasional highlights, and things I felt were worth writing down.',
    blogEmpty: 'No essays published yet.',
    bachelorTitle: 'BSc in Artificial Intelligence · UPC',
    bachelorIntro: "My bachelor's degree in Artificial Intelligence at Universitat Politècnica de Catalunya gave me a broad foundation in the field. Reinforcement learning, computer vision, and robotics particularly captured my interest.",
    droneCaption: 'Drone assembly, the laboratory and outdoor activities during Drone Technology, on my Erasmus exchange at SDU, Denmark.',
    droneAlt: 'Drone prototype with a wooden frame, motors and exposed electronics on a laboratory bench.',
    footer: 'Research & personal notes',
    notFound: 'Page not found', notFoundBody: 'This page may have moved, or the address may be incorrect.',
  },
  es: {
    home: 'Sobre mí', research: 'Investigación', thesis: 'Trabajo de fin de máster', blog: 'Blog',
    bachelorThesis: 'Trabajo de fin de grado',
    skip: 'Saltar al contenido', navigation: 'Navegación principal', language: 'Idioma',
    selected: 'Investigación destacada', read: 'Leer sobre este trabajo', contact: 'Contacto',
    cv: 'CV', thesisPdf: 'Memoria en PDF', code: 'Código',
    supervision: 'Supervisión', author: 'Autor', programme: 'Programa',
    backResearch: 'Toda la investigación', backBlog: 'Todos los escritos',
    thesisSubtitle: 'Tracing Shannon’s footprints across self-supervised learning',
    thesisTitle: 'On probabilistic prediction and information-theoretic operators',
    thesisSummary: '¿Podemos identificar qué observaciones reducirán la incertidumbre predictiva antes de incorporarlas al modelo? Un estudio de la ganancia de información predictiva en regresión lineal bayesiana y análisis probabilístico de componentes principales.',
    researchIntro: 'Me interesan los fundamentos del aprendizaje automático, especialmente los métodos bayesianos y su relación con la teoría de la información. Entre mis intereses están también el aprendizaje autosupervisado, el aprendizaje continuo, el aprendizaje por refuerzo, la visión por computador y los sistemas multiagente.',
    blogIntro: 'Buenas! Aquí comparto notas de investigación, reflexiones, algunos momentos destacados y otras cosas que me parecía que merecía la pena dejar por escrito.',
    blogEmpty: 'Todavía no hay textos publicados.',
    bachelorTitle: 'Grado en Inteligencia Artificial · UPC',
    bachelorIntro: 'El grado en Inteligencia Artificial de la Universitat Politècnica de Catalunya me proporcionó una formación amplia en el campo. El aprendizaje por refuerzo, la visión por computador y la robótica despertaron especialmente mi interés.',
    droneCaption: 'Montaje del dron, laboratorio y actividades al aire libre en Drone Technology durante mi intercambio Erasmus en SDU, Dinamarca.',
    droneAlt: 'Prototipo de dron con estructura de madera, motores y electrónica expuesta sobre una mesa de laboratorio.',
    footer: 'Investigación y notas personales',
    notFound: 'Página no encontrada', notFoundBody: 'Puede que esta página haya cambiado de dirección o que el enlace sea incorrecto.',
  },
} as const;
