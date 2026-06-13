import Link from 'next/link';
import styles from './Footer.module.css';

const QUICK_LINKS = [
  { label: 'About Us',    href: '/about' },
  { label: 'Our Programs', href: '/programs' },
  { label: 'Projects',    href: '/projects' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'News & Events', href: '/news' },
  { label: 'Volunteer',   href: '/volunteer' },
  { label: 'Donate',      href: '/donate' },
  { label: 'Contact Us',  href: '/contact' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/Sir John Ndukwe Legacy Foundation', icon: 'f' },
  { label: 'Instagram', href: 'https://www.instagram.com/sirjohnndukwelegacyfoundation', icon: '◈' },
  { label: 'YouTube', href: 'https://www.youtube.com/@SirJohnNdukweLegacyFoundation', icon: '▶' },
  { label: 'X / Twitter', href: 'https://twitter.com/Sirjohnndukwe', icon: '𝕏' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@SirJohnNdukweLegacyFoundation', icon: '♪' },
  { label: 'Threads', href: 'https://www.threads.net/@Sir John Ndukwe Legacy Foundation', icon: '@' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>

        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logoBadge}>
            <span>SJN</span>
          </div>
          <div>
            <p className={styles.brandName}>SIR JOHN NDUKWE<br />LEGACY FOUNDATION</p>
            <p className={styles.motto}>Equity. Dignity. Humanity.</p>
          </div>
          <p className={styles.tagline}>
            Building a legacy of equity, dignity and humanity for a better tomorrow.
          </p>
        </div>

        {/* Quick links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Quick Links</h3>
          <ul className={styles.linkList}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.footerLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact Us</h3>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactIcon}>📍</span>
              <span>Plot 87 Valington Royal Estate Jikwoyi, FCT, Abuja, Nigeria.</span>
            </li>
            <li>
              <span className={styles.contactIcon}>📞</span>
              <span>+2348065166127 / +2348069099337</span>
            </li>
            <li>
              <span className={styles.contactIcon}>✉</span>
              <a href="mailto:sirjohnfoundation@gmail.com" className={styles.footerLink}>
                sirjohnfoundation@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Follow Us</h3>
          <div className={styles.socialRow}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={styles.socialIcon}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <h3 className={`${styles.colTitle} ${styles.newsletterTitle}`}>Newsletter</h3>
          <p className={styles.newsletterText}>Subscribe to our newsletter for updates</p>
          <form className={styles.newsletterForm} aria-label="Newsletter signup">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className={`form-input ${styles.newsletterInput}`}
              required
            />
            <button type="submit" className={`btn btn--primary btn--sm ${styles.subscribeBtn}`}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} Sir John Ndukwe Legacy Foundation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
