import Link from 'next/link';
import styles from '@/app/styles/Footer.module.css';
import 'boxicons/css/boxicons.min.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>Glamour Lips</h3>
                    <p>Labiales premium que realzan tu belleza natural</p>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" aria-label="Facebook">
                            <i className="bx bxl-facebook"></i>
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram">
                            <i className="bx bxl-instagram"></i>
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter">
                            <i className="bx bxl-twitter"></i>
                        </a>
                    </div>
                </div>
                <div className={styles.footerSection}>
                    <h4>Enlaces rápidos</h4>
                    <ul>
                        <li>
                            <Link href="/products">Productos</Link>
                        </li>
                        <li>
                            <Link href="/about">Sobre nosotros</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contacto</Link>
                        </li>
                        <li>
                            <Link href="/cart">Carrito</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.footerSection}>
                    <h4>Contacto</h4>
                    <p>Email: contacto@glamourlips.com</p>
                    <p>Teléfono: +503 8239462</p>
                    <p>Dirección: Santa Ana, El Salvador</p>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} Glamour Lips. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

