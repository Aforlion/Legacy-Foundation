import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  XIcon,
  TiktokIcon,
  ThreadsIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from '@/components/Icons';

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
  { label: 'Facebook', href: 'https://www.facebook.com/Sir%20John%20Ndukwe%20Legacy%20Foundation', iconKey: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/sirjohnndukwelegacyfoundation', iconKey: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@SirJohnNdukweLegacyFoundation', iconKey: 'youtube' },
  { label: 'X / Twitter', href: 'https://twitter.com/Sirjohnndukwe', iconKey: 'x' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@SirJohnNdukweLegacyFoundation', iconKey: 'tiktok' },
  { label: 'Threads', href: 'https://www.threads.net/@Sir%20John%20Ndukwe%20Legacy%20Foundation', iconKey: 'threads' },
];

export default function Footer() {
  const renderSocialIcon = (key: string) => {
    switch (key) {
      case 'facebook': return <FacebookIcon size={16} />;
      case 'instagram': return <InstagramIcon size={16} />;
      case 'youtube': return <YoutubeIcon size={16} />;
      case 'x': return <XIcon size={14} />;
      case 'tiktok': return <TiktokIcon size={16} />;
      case 'threads': return <ThreadsIcon size={16} />;
      default: return null;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>

        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logoImageWrapper}>
            <Image
              src="/logo.jpg"
              alt="Sir John Ndukwe Legacy Foundation Logo"
              width={52}
              height={52}
              className={styles.logoImage}
            />
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
              <span className={styles.contactIcon}>
                <MapPinIcon size={18} />
              </span>
              <span>Plot 87 Valington Royal Estate Jikwoyi, FCT, Abuja, Nigeria.</span>
            </li>
            <li>
              <span className={styles.contactIcon}>
                <PhoneIcon size={18} />
              </span>
              <span>+2348065166127</span>
            </li>
            <li>
              <span className={styles.contactIcon}>
                <MailIcon size={18} />
              </span>
              <div className={styles.emailsContainer}>
                <a href="mailto:sirjohnfoundation@gmail.com" className={styles.footerLink}>
                  sirjohnfoundation@gmail.com
                </a>
                <a href="mailto:donate@sirjohnndukwelegacyfoundation.org" className={styles.footerLink}>
                  donate@sirjohnndukwelegacyfoundation.org
                </a>
              </div>
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
                {renderSocialIcon(s.iconKey)}
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
