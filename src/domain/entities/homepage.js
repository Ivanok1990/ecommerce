// src/domain/entities/homepage.js
export class Homepage {
    static getContent() {
        return {
            title: 'Glamour Lips - Tu belleza comienza aquí',
            description:
                'Descubre nuestra colección exclusiva de labiales de alta calidad',
            hero: {
                title: 'Colores que enamoran',
                subtitle: 'Descubre la paleta perfecta para cada ocasión',
            },
            about: {
                title: 'Nuestra Filosofía',
                description:
                    'Creemos que la belleza debe ser inclusiva, sostenible y divertida. Nuestros labiales premium están diseñados para realzar tu estilo único mientras cuidan del planeta.',
                gallery: [
                    {
                        href: '/products?category=mate',
                        image: '/images/labial1.jpg',
                        alt: 'Labial mate rojo pasión',
                        label: 'Labiales Mate',
                    },
                    {
                        href: '/products?category=gloss',
                        image: '/images/labial2.jpg',
                        alt: 'Labial gloss nude natural',
                        label: 'Gloss Brillante',
                    },
                    {
                        href: '/products?category=liquido',
                        image: '/images/labial3.jpg',
                        alt: 'Labial líquido de larga duración',
                        label: 'Larga Duración',
                    },
                ],
            },
            products: {
                title: 'Nuestros Productos Destacados',
                description: 'Selección de nuestros labiales más populares',
            },
            commitment: {
                title: 'Nuestro Compromiso',
                image: '/images/coleccion.jpg',
                alt: 'Nuestra colección de labiales',
                points: [
                    'Ingredientes naturales y veganos',
                    'Packaging ecológico y reciclable',
                    'Cruelty Free certificado',
                    'Pigmentación de alta calidad',
                ],
            },
        };
    }
}