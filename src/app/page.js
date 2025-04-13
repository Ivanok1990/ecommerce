'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '@/app/styles/Home.module.css';

export default function Home() {
    return (
        <>
            <Head>
                <title>Glamour Lips - Tu belleza comienza aquí</title>
                <meta name="description" content="Descubre nuestra colección exclusiva de labiales de alta calidad" />
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </Head>

            <Header />

            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Colores que enamoran</h1>
                    <p>Descubre la paleta perfecta para cada ocasión</p>
                    <Link href="/products" className={styles.ctaButton}>
                        Explora la colección
                    </Link>
                </div>
            </div>

            <main className={styles.mainContainer}>
                {/* About Sections */}
                <section className={styles.aboutSection}>
                    <div className={styles.aboutText}>
                        <h2>Nuestra Filosofía</h2>
                        <p>Creemos que la belleza debe ser inclusiva, sostenible y divertida. Nuestros labiales premium están diseñados para realzar tu estilo único mientras cuidan del planeta.</p>
                    </div>
                    <div className={styles.aboutGallery}>
                        <Link href="/products?category=mate" className={styles.galleryItem}>
                            <Image
                                src="/images/labial1.jpg"
                                alt="Labial mate rojo pasión"
                                width={300}
                                height={400}
                                className={styles.galleryImage}
                            />
                            <span>Labiales Mate</span>
                        </Link>
                        <Link href="/products?category=gloss" className={styles.galleryItem}>
                            <Image
                                src="/images/labial2.jpg"
                                alt="Labial gloss nude natural"
                                width={300}
                                height={400}
                                className={styles.galleryImage}
                            />
                            <span>Gloss Brillante</span>
                        </Link>
                        <Link href="/products?category=liquido" className={styles.galleryItem}>
                            <Image
                                src="/images/labial3.jpg"
                                alt="Labial líquido de larga duración"
                                width={300}
                                height={400}
                                className={styles.galleryImage}
                            />
                            <span>Larga Duración</span>
                        </Link>
                    </div>
                </section>

                {/* Product List Section */}
                <section className={styles.productSection}>
                    <div className={styles.sectionHeader}>
                        <h2>Nuestros Productos Destacados</h2>
                        <p>Selección de nuestros labiales más populares</p>
                        <Link href="/products" className={styles.viewAllLink}>
                            Ver todos los productos →
                        </Link>
                    </div>
                </section>

                {/* Commitment Section */}
                <section className={styles.commitmentSection}>
                    <Image
                        src="/images/coleccion.jpg"
                        alt="Nuestra colección de labiales"
                        width={1200}
                        height={600}
                        className={styles.commitmentImage}
                    />
                    <div className={styles.commitmentText}>
                        <h2>Nuestro Compromiso</h2>
                        <ul>
                            <li>Ingredientes naturales y veganos</li>
                            <li>Packaging ecológico y reciclable</li>
                            <li>Cruelty Free certificado</li>
                            <li>Pigmentación de alta calidad</li>
                        </ul>
                        <Link href="/products" className={styles.ctaButtonSecondary}>
                            Descubre nuestra colección completa
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}