'use client';

import { useState } from 'react';
import { submitVolunteerApplication } from './actions';
import styles from './volunteer.module.css';

export default function VolunteerPage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitVolunteerApplication(formData);

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
          <h1>Join Our Cause</h1>
          <p>Be the change you want to see in the world. Help us deliver Equity, Dignity, and Humanity.</p>
        </div>
      </section>

      {/* Main Form Area */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.splitLayout}>
            {/* Informational Column */}
            <div className={styles.infoCol}>
              <span className="section-subtitle">Make a Difference</span>
              <h2 className="section-title">Why Volunteer with SJN-LF?</h2>
              <p className={styles.introParagraph}>
                Volunteers are the backbone of our outreach initiatives. By joining the Sir John Ndukwe Legacy Foundation, you dedicate your energy and expertise to changing the narrative for underprivileged families, women, and children.
              </p>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🌍</div>
                <div>
                  <h3>Community Impact</h3>
                  <p>Directly support grassroots projects that provide education, nourishment, and economic empowerment.</p>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>🤝</div>
                <div>
                  <h3>Skill Development</h3>
                  <p>Gain hands-on experience in program administration, field research, community mobilization, and event coordination.</p>
                </div>
              </div>

              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>💡</div>
                <div>
                  <h3>Vibrant Network</h3>
                  <p>Connect with passionate changemakers, humanitarians, and professionals dedicated to social justice.</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className={styles.formCol}>
              <div className={styles.formCard}>
                <h3>Volunteer Application Form</h3>
                <p>Fill out the form below, and our team will get in touch with you to discuss how you can help.</p>

                {response && (
                  <div className={`${styles.alert} ${response.success ? styles.alertSuccess : styles.alertError}`}>
                    {response.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
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
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="e.g., +234 803 123 4567"
                      className="form-control"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="skills">Areas of Expertise / Skills</label>
                    <textarea
                      id="skills"
                      name="skills"
                      rows={3}
                      placeholder="e.g., Teaching, Healthcare support, Photography, Social media, Logistics..."
                      className="form-control"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Why do you want to join us?</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Share a brief statement about your motivation..."
                      className="form-control"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary btn-block"
                  >
                    {loading ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
