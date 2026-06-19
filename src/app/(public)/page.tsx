import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './home.module.css';

// Fetch dynamic data from Supabase if available, fallback to mock data on error
async function getHomeData() {
  try {
    const [statsRes, newsRes, galleryRes] = await Promise.all([
      supabase.from('stats').select('*').order('id', { ascending: true }),
      supabase.from('news_events').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(3),
      supabase.from('gallery').select('*').order('created_at', { ascending: false }).limit(4)
    ]);

    return {
      stats: statsRes.data && statsRes.data.length > 0 ? statsRes.data : null,
      news: newsRes.data && newsRes.data.length > 0 ? newsRes.data : null,
      gallery: galleryRes.data && galleryRes.data.length > 0 ? galleryRes.data : null,
    };
  } catch (err) {
    console.error('Failed to fetch home page data:', err);
    return { stats: null, news: null, gallery: null };
  }
}

const DEFAULT_STATS = [
  { id: 1, label: 'Lives Impacted', value: '15,000+', icon: '👥' },
  { id: 2, label: 'Scholarships Awarded', value: '250+', icon: '🎓' },
  { id: 3, label: 'Women Empowered', value: '1,200+', icon: '👩' },
  { id: 4, label: 'Communities Reached', value: '45+', icon: '🌍' },
];

const DEFAULT_NEWS = [
  {
    id: '1',
    title: 'SJN-LF Launches 2026 Early Childhood Development Campaign in Abuja',
    summary: 'A new initiative providing educational materials, health checkups, and nutritional support to over 500 children in local communities.',
    image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    published_at: '2026-06-10T10:00:00Z',
    slug: 'ecd-campaign-2026'
  },
  {
    id: '2',
    title: 'Empowering Women Entrepreneurs: Micro-Grant Distributions',
    summary: 'SJN-LF has successfully distributed interest-free seed capital and business tools to 50 female small business owners in Jikwoyi.',
    image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    published_at: '2026-06-05T09:30:00Z',
    slug: 'women-micro-grants'
  },
  {
    id: '3',
    title: 'Upcoming: 2026 Annual Humanitarian Gala & Fundraiser',
    summary: 'Join us next month as we celebrate our impact partners and raise funds for the 2026/2027 rural health outreach programs.',
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
    published_at: '2026-05-28T14:00:00Z',
    slug: 'annual-gala-2026'
  }
];

const DEFAULT_GALLERY = [
  { id: '1', image_url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600', caption: 'Education materials distribution' },
  { id: '2', image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600', caption: 'Skill acquisition workshop' },
  { id: '3', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600', caption: 'Nutritional outreach support' },
  { id: '4', image_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600', caption: 'Youth mentoring session' }
];

export default async function HomePage() {
  const data = await getHomeData();
  const stats = data.stats || DEFAULT_STATS;
  const news = data.news || DEFAULT_NEWS;
  const gallery = data.gallery || DEFAULT_GALLERY;

  return (
    <div className={styles.container}>
      {/* Hero — client banner image, unstyled for UX/UI handoff */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/header.jpg"
            alt="Sir John Ndukwe Legacy Foundation Banner"
            fill
            priority
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* Core Programs Area */}
      <section className={styles.programsSection}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Our Impact Areas</span>
            <h2 className="section-title">Core Programs of the Foundation</h2>
            <p className="section-desc">
              We operate targeted interventions designed to create structural and sustainable progress for families and community groups.
            </p>
          </div>
          <div className={styles.programsGrid}>
            <div className={styles.programCard}>
              <div className={styles.programIcon}>🎓</div>
              <h3>Early Childhood Development</h3>
              <p>Ensuring access to quality foundational learning, learning aids, nutritional support, and early health interventions.</p>
              <Link href="/programs#ecd" className={styles.programLink}>Learn more →</Link>
            </div>
            <div className={styles.programCard}>
              <div className={styles.programIcon}>👩</div>
              <h3>Women Empowerment</h3>
              <p>Providing business capital micro-loans, digital literacy, vocational training, and cooperative support frameworks.</p>
              <Link href="/programs#women" className={styles.programLink}>Learn more →</Link>
            </div>
            <div className={styles.programCard}>
              <div className={styles.programIcon}>📦</div>
              <h3>Poverty Alleviation</h3>
              <p>Distributing relief packages, facilitating vocational apprenticeships, and supporting small-holder community agriculture.</p>
              <Link href="/programs#poverty" className={styles.programLink}>Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities/News Section */}
      <section className={styles.newsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className="section-subtitle font-secondary">Latest News</span>
              <h2 className="section-title">Updates & Press Releases</h2>
            </div>
            <Link href="/news" className="btn btn-outline-primary">
              View All News
            </Link>
          </div>
          <div className={styles.newsGrid}>
            {news.map((item: any) => (
              <article key={item.id} className={styles.newsCard}>
                <div className={styles.newsImgWrapper}>
                  <Image
                    src={item.image_url || '/placeholder-news.jpg'}
                    alt={item.title}
                    fill
                    className={styles.newsImg}
                  />
                </div>
                <div className={styles.newsContent}>
                  <span className={styles.newsDate}>
                    {new Date(item.published_at || item.created_at).toLocaleDateString('en-NG', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <Link href={`/news/${item.slug || item.id}`} className={styles.readMore}>
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Callout */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-subtitle">Our Gallery</span>
            <h2 className="section-title">Moments of Hope & Dignity</h2>
          </div>
          <div className={styles.galleryGrid}>
            {gallery.map((img: any) => (
              <div key={img.id} className={styles.galleryItem}>
                <Image
                  src={img.image_url}
                  alt={img.caption || 'Gallery photo'}
                  fill
                  className={styles.galleryImg}
                />
                <div className={styles.galleryOverlay}>
                  <p className={styles.galleryCaption}>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/gallery" className="btn btn-outline-dark">
              Explore Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBackground}>
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920"
            alt="Join hands with us"
            fill
            className={styles.ctaImage}
          />
          <div className={styles.ctaOverlay} />
        </div>
        <div className={styles.ctaContent}>
          <h2>Ready to Make an Impact?</h2>
          <p>Whether you choose to give your time as a volunteer or sponsor a program through your donations, your support changes lives.</p>
          <div className={styles.ctaButtons}>
            <Link href="/volunteer" className="btn btn--white btn--lg">
              Join as Volunteer
            </Link>
            <Link href="/donate" className="btn btn--ghost btn--lg">
              Support Financially
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
