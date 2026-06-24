import Image from 'next/image';
import Link from 'next/link';
import styles from './projects.module.css';
import SubpageCTA from '@/components/SubpageCTA/SubpageCTA';

export const metadata = {
  title: 'Our Projects',
  description: 'View the active and completed community projects of the Sir John Ndukwe Legacy Foundation across Nigeria.',
};

const PROJECTS = [
  {
    id: 'proj-1',
    title: 'Karshi Rural Community Health Outreach',
    status: 'Completed',
    date: 'March 2026',
    location: 'Karshi, FCT Abuja',
    description: 'A two-day diagnostic and treatment camp providing free checkups, malaria screenings, basic dentistry, and essential medicines to rural residents.',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    metric: '1,200 beneficiaries treated'
  },
  {
    id: 'proj-2',
    title: 'Jikwoyi Market Women Micro-Capital Distribution',
    status: 'Ongoing',
    date: 'Ongoing (Started May 2026)',
    location: 'Jikwoyi, FCT Abuja',
    description: 'Providing interest-free financial micro-seed capital to petty traders to purchase retail goods, coupled with basic accounting mentoring.',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    metric: '120 active micro-businesses funded'
  },
  {
    id: 'proj-3',
    title: 'Nyanya IDP Early Education Literacy Campaign',
    status: 'Completed',
    date: 'January 2026',
    location: 'Nyanya, FCT Abuja',
    description: 'Setting up temporary reading rooms inside IDP settlements and supplying educational reading packets, textbooks, and tablets to young learners.',
    image_url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800',
    metric: '350 children equipped'
  },
  {
    id: 'proj-4',
    title: 'Water for Life: Rural Borehole Drilling Project',
    status: 'Ongoing',
    date: 'Ongoing (Est. Completion August 2026)',
    location: 'Kuje District, Abuja',
    description: 'Surveying and drilling two solar-powered clean water borehole systems in a community experiencing seasonal water-borne diseases.',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800',
    metric: '3,000 residents to access clean water'
  }
];

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <h1>Our Projects</h1>
          <p>Real, on-the-ground initiatives addressing tangible challenges in communities.</p>
        </div>
      </section>

      {/* Subpage CTA Band */}
      <SubpageCTA />

      {/* Projects Grid */}
      <section className={styles.projectsSection}>
        <div className="container">
          <div className={styles.projectsGrid}>
            {PROJECTS.map((proj) => (
              <div key={proj.id} className={styles.projectCard}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={proj.image_url}
                    alt={proj.title}
                    fill
                    className={styles.projImg}
                  />
                  <span className={`${styles.statusBadge} ${proj.status === 'Completed' ? styles.statusCompleted : styles.statusOngoing}`}>
                    {proj.status}
                  </span>
                </div>
                <div className={styles.projContent}>
                  <div className={styles.metadataRow}>
                    <span>📍 {proj.location}</span>
                    <span>📅 {proj.date}</span>
                  </div>
                  <h3>{proj.title}</h3>
                  <p className={styles.description}>{proj.description}</p>
                  <div className={styles.metricBox}>
                    <span className={styles.metricLabel}>Impact Highlight</span>
                    <span className={styles.metricValue}>{proj.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Banner */}
      <section className={styles.sponsorBanner}>
        <div className="container text-center">
          <h2>Have a Particular Community Project in Mind?</h2>
          <p>We work with international partners, corporate organizations, and philanthropic individuals to execute custom, targeted projects.</p>
          <div className={styles.ctaButtons}>
            <Link href="/volunteer" className="btn btn-light btn-lg">
              Partner as Volunteer
            </Link>
            <Link href="/donate" className="btn btn-outline-light btn-lg">
              Fund a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
