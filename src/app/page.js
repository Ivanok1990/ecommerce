// src/app/page.js
'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Homepage } from '@/domain/entities/homepage';
import styles from '@/app/styles/Home.module.css';

// Prevent static prerendering
export const dynamic = 'force-dynamic';

function HomeContent() {
    const content = Homepage.getContent();

    return (
        <>
            <Head>
                <title>{content.title}</title>
                <meta name="description" content={content.description} />
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </Head>

            <Header />

            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>{content.hero.title}</h1>
                    <p>{content.hero.subtitle}</p>
                    <Link href="/products" className={styles.ctaButton}>
                        Explora la colección
                    </Link>
                </div>
            </div>

            <main className={styles.mainContainer}>
                {/* About Sections */}
                <section className={styles.aboutSection}>
                    <div className={styles.aboutText}>
                        <h2>{content.about.title}</h2>
                        <p>{content.about.description}</p>
                    </div>
                    <div className={styles.aboutGallery}>
                        {content.about.gallery.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={styles.galleryItem}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.alt}
                                    width={300}
                                    height={400}
                                    className={styles.galleryImage}
                                />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Product List Section */}
                <section className={styles.productSection}>
                    <div className={styles.sectionHeader}>
                        <h2>{content.products.title}</h2>
                        <p>{content.products.description}</p>
                        <Link href="/products" className={styles.viewAllLink}>
                            Ver todos los productos →
                        </Link>
                    </div>
                </section>

                {/* Commitment Section */}
                <section className={styles.commitmentSection}>
                    <Image
                        src={content.commitment.image}
                        alt={content.commitment.alt}
                        width={1200}
                        height={600}
                        className={styles.commitmentImage}
                    />
                    <div className={styles.commitmentText}>
                        <h2>{content.commitment.title}</h2>
                        <ul>
                            {content.commitment.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
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

export default function Home() {
    return (
        <Suspense fallback={<div>Loading Glamour Lips...</div>}>
            <HomeContent />
        </Suspense>
    );
}