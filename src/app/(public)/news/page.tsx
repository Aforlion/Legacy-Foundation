'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import styles from './news.module.css';
import SubpageCTA from '@/components/SubpageCTA/SubpageCTA';

const DEFAULT_NEWS_EVENTS = [
  {
    id: '1',
    title: 'SJN-LF Launches 2026 Early Childhood Development Campaign in Abuja',
    summary: 'A new initiative providing educational materials, health checkups, and nutritional support to over 500 children in local communities.',
    cover_image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    type: 'news',
    published_at: '2026-06-10T10:00:00Z',
    slug: 'ecd-campaign-2026'
  },
  {
    id: '2',
    title: 'Empowering Women Entrepreneurs: Micro-Grant Distributions',
    summary: 'SJN-LF has distributed interest-free seed capital and business tools to 50 female small business owners in Jikwoyi.',
    cover_image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
    type: 'news',
    published_at: '2026-06-05T09:30:00Z',
    slug: 'women-micro-grants'
  },
  {
    id: '3',
    title: '2026 Annual Humanitarian Gala & Fundraiser',
    summary: 'Join us next month as we celebrate our impact partners and raise funds for the 2026/2027 rural health outreach programs.',
    cover_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800',
    type: 'event',
    event_date: '2026-07-15',
    published_at: '2026-05-28T14:00:00Z',
    slug: 'annual-gala-2026'
  },
  {
    id: '4',
    title: 'Volunteer Orientation & Field Training Session',
    summary: 'A training workshop for new volunteer recruits. We will cover field safety guidelines, outreach registration tools, and community engagement basics.',
    cover_image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800',
    type: 'event',
    event_date: '2026-06-25',
    published_at: '2026-06-01T08:00:00Z',
    slug: 'volunteer-orientation-june'
  }
];

export default function NewsEventsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'event'>('all');

  useEffect(() => {
    async function fetchNewsEvents() {
      try {
        const { data, error } = await supabase
          .from('news_events')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(DEFAULT_NEWS_EVENTS);
        }
      } catch (err) {
        console.error('Error fetching news & events:', err);
        setItems(DEFAULT_NEWS_EVENTS);
      }
    }
    fetchNewsEvents();
  }, []);

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter(item => item.type === activeTab);

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <h1>News & Events</h1>
          <p>Stay updated with our latest activities, press announcements, and upcoming events.</p>
        </div>
      </section>

      {/* Subpage CTA Band */}
      <SubpageCTA />

      {/* Content Section */}
      <section className={styles.newsSection}>
        <div className="container">
          {/* Tab Filter bar */}
          <div className={styles.tabBar}>
            <button
              onClick={() => setActiveTab('all')}
              className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTab : ''}`}
            >
              All Updates
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`${styles.tabBtn} ${activeTab === 'news' ? styles.activeTab : ''}`}
            >
              News Articles
            </button>
            <button
              onClick={() => setActiveTab('event')}
              className={`${styles.tabBtn} ${activeTab === 'event' ? styles.activeTab : ''}`}
            >
              Upcoming Events
            </button>
          </div>

          {/* Grid Layout */}
          <div className={styles.newsGrid}>
            {filteredItems.map(item => (
              <article key={item.id} className={styles.newsCard}>
                <div className={styles.imgWrapper}>
                  <Image
                    src={item.cover_image || '/placeholder-news.jpg'}
                    alt={item.title}
                    fill
                    className={styles.cardImg}
                  />
                  <span className={`${styles.typeBadge} ${item.type === 'event' ? styles.badgeEvent : styles.badgeNews}`}>
                    {item.type}
                  </span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.meta}>
                    {item.type === 'event' && item.event_date && (
                      <span className={styles.eventDate}>📅 Event: {new Date(item.event_date).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    )}
                    <span className={styles.pubDate}>
                      Published: {new Date(item.published_at || item.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary || (item.content && item.content.slice(0, 140) + '...')}</p>
                  <Link href={`/news/${item.slug || item.id}`} className={styles.readLink}>
                    Read Full Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No updates found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
