'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import styles from './gallery.module.css';
import SubpageCTA from '@/components/SubpageCTA/SubpageCTA';

const DEFAULT_GALLERY = [
  { id: '1', image_url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800', title: 'Early learning toys distribution', category: 'education' },
  { id: '2', image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800', title: 'SJN-LF digital literacy workshop', category: 'empowerment' },
  { id: '3', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800', title: 'Food basket distribution campaign', category: 'outreach' },
  { id: '4', image_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800', title: 'Youth mentoring session in Jikwoyi', category: 'education' },
  { id: '5', image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800', title: 'Market women business briefing', category: 'empowerment' },
  { id: '6', image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800', title: 'Outreach registration setup', category: 'outreach' }
];

const CATEGORIES = [
  { id: 'all', label: 'All Media' },
  { id: 'education', label: 'Education' },
  { id: 'empowerment', label: 'Empowerment' },
  { id: 'outreach', label: 'Outreach & Relief' }
];

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(DEFAULT_GALLERY);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setItems(DEFAULT_GALLERY);
      }
    }
    fetchGallery();
  }, []);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category?.toLowerCase() === activeCategory);

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerOverlay} />
        <div className={styles.headerContent}>
          <h1>Our Gallery</h1>
          <p>A visual record of our journeys, our interventions, and the lives we touch.</p>
        </div>
      </section>

      {/* Subpage CTA Band */}
      <SubpageCTA />

      {/* Main Section */}
      <section className={styles.gallerySection}>
        <div className="container">
          {/* Category Filter bar */}
          <div className={styles.filterBar}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.activeBtn : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className={styles.galleryGrid}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={styles.galleryItem}
                onClick={() => setLightboxImg({ url: item.image_url, title: item.title || item.caption || 'SJN-LF Gallery Image' })}
              >
                <div className={styles.imgWrapper}>
                  <Image
                    src={item.image_url}
                    alt={item.title || 'Gallery image'}
                    fill
                    className={styles.galleryImg}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.zoomIcon}>🔍</span>
                    <p className={styles.caption}>{item.title || item.caption || 'View Image'}</p>
                    {item.category && <span className={styles.tag}>{item.category}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No media items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className={styles.lightbox} onClick={() => setLightboxImg(null)}>
          <button className={styles.closeBtn} onClick={() => setLightboxImg(null)}>×</button>
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            <div className={styles.lightboxImgWrapper}>
              <img
                src={lightboxImg.url}
                alt={lightboxImg.title}
                className={styles.lightboxImg}
              />
            </div>
            <p className={styles.lightboxTitle}>{lightboxImg.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
