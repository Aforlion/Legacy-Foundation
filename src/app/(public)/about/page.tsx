import Image from 'next/image';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the legacy of Sir John Ndukwe, our mission, vision, core values, and our commitment to social justice and human development.',
};

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <h1>Who We Are</h1>
          <p>Guided by the legacy of Sir John Ndukwe, we advance equity, dignity, and humanity.</p>
        </div>
      </section>

      {/* Founder Legacy & Story */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyImgWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"
                alt="Sir John Ndukwe"
                width={500}
                height={600}
                className={styles.storyImg}
              />
            </div>
            <div className={styles.storyContent}>
              <span className="section-subtitle">Our Legacy</span>
              <h2 className="section-title">The Legacy of Sir John Ndukwe</h2>
              <p className={styles.leadParagraph}>
                Sir John Ndukwe was a visionary leader, philanthropist, and champion of the underprivileged. Throughout his life, he fought tirelessly for the rights of marginalized communities and worked to provide educational opportunities to children who had none.
              </p>
              <p>
                Established to immortalize his humanitarian work, the Sir John Ndukwe Legacy Foundation (SJN-LF) officially carries forward his mission. We believe that every individual deserves a life of dignity, free from poverty, and equipped with the tools to realize their full potential.
              </p>
              <p>
                Based in Abuja, Nigeria, the foundation designs and implements sustainable community development programs targeting early childhood education, micro-capital support for women, and general poverty alleviation in vulnerable communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎯</div>
              <h3>Our Mission</h3>
              <p>To advance social justice, human dignity, and inclusive development by providing access to education, economic opportunities, and critical welfare support to vulnerable groups.</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>👁️</div>
              <h3>Our Vision</h3>
              <p>A society built on the pillars of equity and fairness, where every human life is valued and every individual has the dignity and opportunity to thrive.</p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌟</div>
              <h3>Core Motto</h3>
              <p><strong>Equity. Dignity. Humanity.</strong> These three pillars drive all our strategic programs, grassroots campaigns, and resource distributions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Detail List */}
      <section className={styles.detailsSection}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">What Guides Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className={styles.coreValuesGrid}>
            <div className={styles.coreValueItem}>
              <h4>1. Transparency & Trust</h4>
              <p>We hold ourselves accountable to our donors, partners, and beneficiaries. We ensure that resources are deployed efficiently and direct impacts are clearly measured and published.</p>
            </div>
            <div className={styles.coreValueItem}>
              <h4>2. Inclusion & Non-Discrimination</h4>
              <p>Our interventions are delivered to those who need them most, regardless of gender, tribe, ethnicity, religion, or social status.</p>
            </div>
            <div className={styles.coreValueItem}>
              <h4>3. Sustainable Development</h4>
              <p>We do not just provide temporary relief; we design programs that foster self-reliance, build local capacity, and create lasting generational change.</p>
            </div>
            <div className={styles.coreValueItem}>
              <h4>4. Community Ownership</h4>
              <p>We engage local communities directly in planning and executing projects, ensuring that interventions are tailored and well-received.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
