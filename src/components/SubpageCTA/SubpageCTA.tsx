'use client';

import Link from 'next/link';
import styles from './SubpageCTA.module.css';

export default function SubpageCTA() {
  return (
    <section className={styles.ctaBand}>
      <div className={`container ${styles.ctaInner}`}>
        <div className={styles.textContainer}>
          <span className={styles.accentText}>Support a Life Today</span>
          <h3 className={styles.heading}>Make a Difference in Vulnerable Communities</h3>
        </div>
        <div className={styles.buttonGroup}>
          <Link href="/donate" className="btn btn--white" style={{ fontWeight: 800 }}>
            Donate Now ♥
          </Link>
          <Link href="/volunteer" className="btn btn--ghost" style={{ fontWeight: 800 }}>
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
