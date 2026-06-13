import Image from 'next/image';
import Link from 'next/link';
import styles from './programs.module.css';

export const metadata = {
  title: 'Our Programs',
  description: 'Explore our core programs in Nigeria: Early Childhood Development, Women Empowerment, and Poverty Alleviation initiatives.',
};

export default function ProgramsPage() {
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <h1>Our Programs</h1>
          <p>Targeted, structured interventions designed to create sustainable, long-term impact.</p>
        </div>
      </section>

      {/* Program 1: Early Childhood Development */}
      <section id="ecd" className={styles.programSection}>
        <div className="container">
          <div className={styles.programGrid}>
            <div className={styles.programContent}>
              <span className={styles.categoryBadge}>Education & Health</span>
              <h2>Early Childhood Development</h2>
              <p className={styles.leadParagraph}>
                Providing young children in impoverished communities with foundational learning, nourishment, and health screenings.
              </p>
              <p>
                Early childhood is the most critical phase of human development. Unfortunately, millions of children in Nigeria grow up without access to structured early education, basic immunization, or proper nutrition, leading to developmental stunting.
              </p>
              <p>
                SJN-LF partners with local educators and clinics to run mobile learning spaces, distribute early literacy materials, and conduct comprehensive nutritional outreaches. We believe that setting a strong foundation early breaks the cycle of poverty.
              </p>
              <div className={styles.keyStats}>
                <div>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Children Reached</span>
                </div>
                <div>
                  <span className={styles.statNumber}>10+</span>
                  <span className={styles.statLabel}>Partner Schools</span>
                </div>
              </div>
            </div>
            <div className={styles.programImgWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800"
                alt="Early Childhood Development"
                width={500}
                height={400}
                className={styles.programImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program 2: Women Empowerment */}
      <section id="women" className={`${styles.programSection} ${styles.bgLight}`}>
        <div className="container">
          <div className={`${styles.programGrid} ${styles.reverse}`}>
            <div className={styles.programContent}>
              <span className={styles.categoryBadge}>Economic Inclusion</span>
              <h2>Women Empowerment & Micro-Grants</h2>
              <p className={styles.leadParagraph}>
                Providing interest-free micro-seed capital, digital literacy, and business mentoring to female micro-entrepreneurs.
              </p>
              <p>
                When you empower a woman, you lift an entire family. Most women in rural and peri-urban settlements run small-scale retail operations but lack access to traditional credit systems due to high interest rates and collateral requirements.
              </p>
              <p>
                Our micro-grant scheme distributes small seed funds directly to women traders. Along with the capital, we provide workshops on accounting basics, marketing strategies, and digital payments to ensure sustainable growth.
              </p>
              <div className={styles.keyStats}>
                <div>
                  <span className={styles.statNumber}>1,200+</span>
                  <span className={styles.statLabel}>Women Funded</span>
                </div>
                <div>
                  <span className={styles.statNumber}>₦50M+</span>
                  <span className={styles.statLabel}>Disbursed Capital</span>
                </div>
              </div>
            </div>
            <div className={styles.programImgWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800"
                alt="Women Empowerment"
                width={500}
                height={400}
                className={styles.programImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program 3: Poverty Alleviation */}
      <section id="poverty" className={styles.programSection}>
        <div className="container">
          <div className={styles.programGrid}>
            <div className={styles.programContent}>
              <span className={styles.categoryBadge}>Welfare & Relief</span>
              <h2>Poverty Alleviation & Outreach</h2>
              <p className={styles.leadParagraph}>
                Responding to immediate crises through food relief, medical checkups, clothing distributions, and skills training.
              </p>
              <p>
                While long-term development is our goal, immediate survival cannot be ignored. High inflation rates and economic shocks have pushed millions of households into severe food insecurity.
              </p>
              <p>
                SJN-LF organizes quarterly outreach programs to underserved neighborhoods and internally displaced persons (IDPs) camps. We distribute nutrition bags containing staple foods, offer free physician consultations, dispense basic medications, and run short-term apprenticeship programs.
              </p>
              <div className={styles.keyStats}>
                <div>
                  <span className={styles.statNumber}>15,000+</span>
                  <span className={styles.statLabel}>Relief Packages</span>
                </div>
                <div>
                  <span className={styles.statNumber}>45+</span>
                  <span className={styles.statLabel}>Outreach Camps</span>
                </div>
              </div>
            </div>
            <div className={styles.programImgWrapper}>
              <Image
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"
                alt="Poverty Alleviation"
                width={500}
                height={400}
                className={styles.programImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Call to Action */}
      <section className={styles.bottomCta}>
        <div className="container text-center">
          <h2>Support Our Programs Today</h2>
          <p>Every contribution, big or small, helps fund our operations on the field. Join us in making a difference.</p>
          <div className={styles.ctaButtons}>
            <Link href="/volunteer" className="btn btn-primary btn-lg">
              Volunteer for a Program
            </Link>
            <Link href="/donate" className="btn btn-outline-primary btn-lg">
              Sponsor a Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
