'use client';

import { useState } from 'react';
import { submitContactForm } from './actions';
import styles from './contact.module.css';
import SubpageCTA from '@/components/SubpageCTA/SubpageCTA';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  XIcon,
  TiktokIcon,
  ThreadsIcon,
} from '@/components/Icons';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    setResponse(result);
    setLoading(false);

    if (result.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <h1>Contact Us</h1>
          <p>Get in touch with the Sir John Ndukwe Legacy Foundation. We would love to hear from you.</p>
        </div>
      </section>

      {/* Subpage CTA Band */}
      <SubpageCTA />

      {/* Content Grid */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.splitLayout}>
            {/* Contact Information Cards */}
            <div className={styles.infoCol}>
              <span className="section-subtitle">Get in Touch</span>
              <h2 className="section-title">Contact Information</h2>
              <p className={styles.introParagraph}>
                Have questions about our initiatives, volunteer applications, or partnerships? Reach out to us through any of the channels below, or fill out the inquiry form.
              </p>

              <div className={styles.infoCardsGrid}>
                {/* Address Card */}
                <div className={styles.infoCard}>
                  <div className={styles.infoIconWrapper}>
                    <MapPinIcon size={24} />
                  </div>
                  <div className={styles.infoCardContent}>
                    <h3>Our Address</h3>
                    <p>Plot 87 Valington Royal Estate Jikwoyi, FCT, Abuja, Nigeria.</p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className={styles.infoCard}>
                  <div className={styles.infoIconWrapper}>
                    <PhoneIcon size={24} />
                  </div>
                  <div className={styles.infoCardContent}>
                    <h3>Phone Number</h3>
                    <p>
                      <a href="tel:+2348065166127" className={styles.infoLink}>
                        +234 806 516 6127
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email Card */}
                <div className={styles.infoCard}>
                  <div className={styles.infoIconWrapper}>
                    <MailIcon size={24} />
                  </div>
                  <div className={styles.infoCardContent}>
                    <h3>Email Addresses</h3>
                    <p>
                      <a href="mailto:sirjohnfoundation@gmail.com" className={styles.infoLink}>
                        sirjohnfoundation@gmail.com
                      </a>
                    </p>
                    <p>
                      <a href="mailto:donate@sirjohnndukwelegacyfoundation.org" className={styles.infoLink}>
                        donate@sirjohnndukwelegacyfoundation.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className={styles.socialCard}>
                <h3>Connect With Us</h3>
                <div className={styles.socialIconsRow}>
                  <a href="https://www.facebook.com/Sir%20John%20Ndukwe%20Legacy%20Foundation" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FacebookIcon size={18} />
                  </a>
                  <a href="https://www.instagram.com/sirjohnndukwelegacyfoundation" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon size={18} />
                  </a>
                  <a href="https://www.youtube.com/@SirJohnNdukweLegacyFoundation" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <YoutubeIcon size={18} />
                  </a>
                  <a href="https://twitter.com/Sirjohnndukwe" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                    <XIcon size={16} />
                  </a>
                  <a href="https://www.tiktok.com/@SirJohnNdukweLegacyFoundation" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <TiktokIcon size={18} />
                  </a>
                  <a href="https://www.threads.net/@Sir%20John%20Ndukwe%20Legacy%20Foundation" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                    <ThreadsIcon size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3>Send Us a Message</h3>
                <p>Use the form below to drop us a note, and our team will get back to you as soon as possible.</p>

                {response && (
                  <div className={`${styles.alert} ${response.success ? styles.alertSuccess : styles.alertError}`}>
                    {response.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g., Ngozi Adebayo"
                      className="form-control"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g., ngozi@example.com"
                      className="form-control"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="e.g., Inquiry about sponsorships"
                      className="form-control"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Type your message details here..."
                      className="form-control"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn--primary btn--sm"
                    style={{ width: '100%', marginTop: '1rem', paddingBlock: '0.8rem' }}
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className="container">
          <div className={styles.mapCard}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapOverlayText}>
                <h3>Sir John Ndukwe Legacy Foundation Head Office</h3>
                <p>📍 Plot 87 Valington Royal Estate Jikwoyi, FCT, Abuja, Nigeria.</p>
                <a
                  href="https://maps.google.com/?q=Plot+87+Valington+Royal+Estate+Jikwoyi+Abuja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--white btn--sm"
                  style={{ marginTop: '1rem' }}
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
