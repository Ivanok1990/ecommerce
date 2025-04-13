// src/domain/entities/footer.js
export class FooterContent {
    static getContent() {
        return {
            brand: 'Glamour Lips',
            tagline: 'Labiales premium que realzan tu belleza natural',
            socials: [
                { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
                { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
                { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
            ],
            links: [
                { href: '/products', label: 'Productos' },
                { href: '/about', label: 'Sobre nosotros' },
                { href: '/contact', label: 'Contacto' },
                { href: '/cart', label: 'Carrito' },
            ],
            contact: {
                email: 'contacto@glamourlips.com',
                phone: '+503 8239462',
                address: 'Santa Ana, El Salvador',
            },
        };
    }
}