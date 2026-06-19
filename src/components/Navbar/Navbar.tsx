'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  XIcon,
  TiktokIcon,
} from '@/components/Icons';

const NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'About Us',    href: '/about' },
  {
    label: 'Our Programs',
    href: '/programs',
    children: [
      { label: 'Early Childhood Development', href: '/programs#ecd' },
      { label: 'Women Empowerment',           href: '/programs#women' },
      { label: 'Poverty Alleviation',         href: '/programs#poverty' },
    ],
  },
  { label: 'Projects',    href: '/projects' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'News & Events', href: '/news' },
  { label: 'Volunteer',   href: '/volunteer' },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Top utility bar ─────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <span className={styles.welcomeText}>Welcome to Sir John Ndukwe Legacy Foundation</span>
          <div className={styles.topBarRight}>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com/Sir%20John%20Ndukwe%20Legacy%20Foundation" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon size={14} />
              </a>
              <a href="https://www.instagram.com/sirjohnndukwelegacyfoundation" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={14} />
              </a>
              <a href="https://www.youtube.com/@SirJohnNdukweLegacyFoundation" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YoutubeIcon size={14} />
              </a>
              <a href="https://twitter.com/Sirjohnndukwe" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                <XIcon size={12} />
              </a>
              <a href="https://www.tiktok.com/@SirJohnNdukweLegacyFoundation" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TiktokIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main navigation ──────────────────────────────────── */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.headerInner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoImageWrapper}>
              <Image
                src="/logo.jpg"
                alt="Sir John Ndukwe Legacy Foundation Logo"
                width={52}
                height={52}
                className={styles.logoImage}
                priority
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>SIR JOHN NDUKWE</span>
              <span className={styles.logoSub}>LEGACY FOUNDATION</span>
              <span className={styles.logoMotto}>Equity. Dignity. Humanity.</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className={styles.dropdown}
                  onMouseEnter={() => setDropOpen(true)}
                  onMouseLeave={() => setDropOpen(false)}
                >
                  <button className={styles.navLink} aria-haspopup="true" aria-expanded={dropOpen}>
                    {link.label} <span className={styles.caret}>▾</span>
                  </button>
                  <div className={`${styles.dropMenu} ${dropOpen ? styles.dropOpen : ''}`}>
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} className={styles.dropItem}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <Link href="/donate" className="btn btn--primary btn--sm" id="cta-donate-header">
            Donate Now ♥
          </Link>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/donate" className="btn btn--primary" onClick={() => setMenuOpen(false)}>
            Donate Now ♥
          </Link>
        </div>
      </header>
    </>
  );
}
