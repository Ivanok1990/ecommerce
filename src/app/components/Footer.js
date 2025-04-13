// src/app/components/Footer.js
import Link from 'next/link';
import styles from '@/app/styles/Footer.module.css';
import 'boxicons/css/boxicons.min.css';
import { FooterContent } from '@/domain/entities/footer';

export default function Footer() {
    const content = FooterContent.getContent();

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>{content.brand}</h3>
                    <p>{content.tagline}</p>
                    <div className={styles.socialIcons}>
                        {content.socials.map((social) => (
                            <a key={social.name} href={social.url} aria-label={social.name}>
                                <i className={`bx bxl-${social.icon}`}></i>
                            </a>
                        ))}
                    </div>
                </div>
                <div className={styles.footerSection}>
                    <h4>Enlaces rápidos</h4>
                    <ul>
                        {content.links.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h4>Contacto</h4>
                    <p>Email: {content.contact.email}</p>
                    <p>Teléfono: {content.contact.phone}</p>
                    <p>Dirección: {content.contact.address}</p>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} {content.brand}. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}