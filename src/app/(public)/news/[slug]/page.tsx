import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './detail.module.css';

// Generate mock data detail helper if db query yields nothing (for MVP fallback)
const DEFAULT_ARTICLES: Record<string, any> = {
  'ecd-campaign-2026': {
    title: 'SJN-LF Launches 2026 Early Childhood Development Campaign in Abuja',
    type: 'news',
    published_at: '2026-06-10T10:00:00Z',
    cover_image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200',
    content: `
      <p>The Sir John Ndukwe Legacy Foundation (SJN-LF) is pleased to announce the formal launch of our 2026 Early Childhood Development Campaign. Designed to establish a firm educational and nutritional foundation for children under the age of eight, the campaign will run throughout the FCT Abuja and surrounding states.</p>
      
      <p>During the launch event held on June 10, over 500 children from marginalized households in the Jikwoyi and Karshi districts received packs containing textbooks, exercise books, writing aids, and early educational toys. In addition, our volunteer health professionals administered general health checkups, dental hygiene briefings, and distributed vitamin supplements.</p>
      
      <h3>Pioneering Mobile Learning Spaces</h3>
      <p>A key highlight of this year's campaign is the introduction of mobile learning spaces. These are retrofitted vans equipped with teaching boards, mini-libraries, and educational tablets that visit underserved neighborhoods twice a week. Under the supervision of volunteer early-years educators, children are taught basic numeracy, literacy, and creative arts.</p>
      
      <blockquote>
        "Early childhood is the most crucial phase of human brain development. When we ignore these years, we build a future of inequality. By equipping these children today, we give them a fighting chance."
        <cite>— SJN-LF Board Member</cite>
      </blockquote>
      
      <h3>Our Strategic Partners</h3>
      <p>This campaign has been made possible through the generous support of local businesses, individual donors, and partner primary schools who donated curriculum textbooks. We continue to invite individuals to join us as volunteers or sponsor the setup of additional mobile learning hubs.</p>
    `
  },
  'women-micro-grants': {
    title: 'Empowering Women Entrepreneurs: Micro-Grant Distributions',
    type: 'news',
    published_at: '2026-06-05T09:30:00Z',
    cover_image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200',
    content: `
      <p>The economic empowerment of women is a core pillar of the Sir John Ndukwe Legacy Foundation. On June 5, 2026, the foundation completed the first batch of micro-grant disbursements to 50 female retail business owners located in the Jikwoyi market area.</p>
      
      <p>Each recipient received interest-free seed capital and tools suited to their trade. These small-scale entrepreneurs run businesses ranging from vegetable kiosks and tailoring shops to mini-convenience stalls. Without access to traditional banking facilities, many of these women have struggled with predatory local moneylenders charging up to 50% interest rates.</p>
      
      <h3>More Than Just Financial Capital</h3>
      <p>Recognizing that money alone is not sufficient to guarantee business success, SJN-LF structured the grants to include a mandatory business mentoring framework. Before receiving the capital, recipients attended a three-day intensive workshop covering basic bookkeeping, pricing strategies, inventory management, and digital payment systems.</p>
      
      <blockquote>
        "With this interest-free capital, I have bought three bags of rice and two cartons of cooking oil directly from wholesalers. I can now sell at a profit and feed my children without fear."
        <cite>— Mrs. Comfort Obi, Beneficiary</cite>
      </blockquote>
      
      <h3>Monitoring and Cooperative Networks</h3>
      <p>Over the next six months, field officers from the foundation will visit each beneficiary weekly to review bookkeeping records and provide troubleshooting advice. The beneficiaries have also been grouped into support cooperatives to encourage saving pools and collaborative wholesaling purchasing.</p>
    `
  },
  'annual-gala-2026': {
    title: '2026 Annual Humanitarian Gala & Fundraiser',
    type: 'event',
    event_date: '2026-07-15',
    published_at: '2026-05-28T14:00:00Z',
    cover_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200',
    content: `
      <p>We are delighted to invite our donors, partners, volunteers, and the general public to the Sir John Ndukwe Legacy Foundation Annual Humanitarian Gala & Fundraiser. Scheduled for July 15, 2026, the event celebrates our collective impact and raises funds for critical 2026/2027 outreach campaigns.</p>
      
      <p>The theme of this year's gala is <strong>"Equity in Action: Supporting the Unreached."</strong> The gala will feature keynote speeches by leading humanitarians, testimonies from our program beneficiaries, a silent auction of local art, and live performances celebrating Nigerian heritage.</p>
      
      <h3>Funding Target: Rural Health & Boreholes</h3>
      <p>Our goal for the evening is to raise <strong>₦30,000,000</strong>. 100% of the proceeds from the ticket sales and auction will go directly toward funding our upcoming rural health camps in Kuje and the drilling of clean water borehole systems in three selected water-deprived settlements.</p>
      
      <h3>Event Details:</h3>
      <ul>
        <li><strong>Date:</strong> Wednesday, July 15, 2026</li>
        <li><strong>Time:</strong> 6:00 PM Prompt (Red carpet starts at 5:00 PM)</li>
        <li><strong>Venue:</strong> Grand Ballroom, Valington Hotel, Abuja</li>
        <li><strong>Dress Code:</strong> Elegant Traditional or Black Tie</li>
      </ul>
      
      <p>To reserve a seat, purchase a corporate table, or donate auction items, please contact us at info@sirjohnndukwelegacyfoundation.org or call +234-806-516-6127.</p>
    `
  },
  'volunteer-orientation-june': {
    title: 'Volunteer Orientation & Field Training Session',
    type: 'event',
    event_date: '2026-06-25',
    published_at: '2026-06-01T08:00:00Z',
    cover_image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200',
    content: `
      <p>Are you a newly registered volunteer or interested in joining our field teams? Our quarterly Volunteer Orientation and Field Training session is scheduled for June 25, 2026.</p>
      
      <p>This hands-on workshop is mandatory for all volunteers wishing to participate in our upcoming Karshi Medical Outreach and community teaching schedules. The session will cover community engagement protocols, field registration tools, emergency response drills, and team assignments.</p>
      
      <h3>Workshop Agenda:</h3>
      <ul>
        <li><strong>09:00 AM:</strong> Welcome & SJN-LF Legacy Overview</li>
        <li><strong>10:00 AM:</strong> Ethics of Grassroots Engagement: Respect, Dignity & Safety</li>
        <li><strong>11:30 AM:</strong> Mobile Database Form Training (Using tablet-based forms)</li>
        <li><strong>01:00 PM:</strong> Lunch & Networking Break</li>
        <li><strong>02:00 PM:</strong> Simulation Outreaches (Roleplay sessions)</li>
        <li><strong>04:00 PM:</strong> Q&A and Team Leader Assignments</li>
      </ul>
      
      <p>Please come dressed in comfortable activewear and sneakers as we will be performing outdoor team-building simulations. Registration is free but required to ensure catering arrangements. Sign up via the Volunteer page on our website.</p>
    `
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Try querying database first
  let article = null;
  try {
    const { data } = await supabase
      .from('news_events')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) article = data;
  } catch (err) {
    console.error('Failed to retrieve article from DB:', err);
  }

  // Fallback to static articles
  if (!article) {
    article = DEFAULT_ARTICLES[slug];
  }

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.container}>
      {/* Cover Image Area */}
      <div className={styles.heroWrapper}>
        <Image
          src={article.cover_image || article.image_url || '/placeholder-news-bg.jpg'}
          alt={article.title}
          fill
          priority
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link href="/news" className={styles.backLink}>← Back to News</Link>
          <span className={`${styles.typeBadge} ${article.type === 'event' ? styles.badgeEvent : styles.badgeNews}`}>
            {article.type}
          </span>
          <h1>{article.title}</h1>
          <div className={styles.metaRow}>
            {article.event_date && (
              <span className={styles.eventDate}>📅 Event Date: {new Date(article.event_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            )}
            <span className={styles.pubDate}>
              Published: {new Date(article.published_at || article.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className={styles.bodySection}>
        <div className="container">
          <div className={styles.layout}>
            {/* Main Article Body */}
            <article className={styles.article}>
              <div
                className={styles.richText}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

            {/* Sidebar widgets */}
            <aside className={styles.sidebar}>
              <div className={styles.widget}>
                <h3>Support this Cause</h3>
                <p>Every donation funds field programs directly. Partner with us today to touch lives.</p>
                <Link href="/donate" className="btn btn-primary btn-block">Donate Now</Link>
              </div>
              <div className={styles.widget}>
                <h3>Want to Help?</h3>
                <p>Register as a volunteer and contribute your skills to upcoming community outreach campaigns.</p>
                <Link href="/volunteer" className="btn btn-outline-primary btn-block">Join as Volunteer</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
