'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { createGalleryItem, deleteGalleryItem } from './actions';
import styles from './galleryAdmin.module.css';

export default function GalleryAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('general');

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setTitle('');
    setImageUrl('');
    setCategory('general');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      image_url: imageUrl,
      category,
    };

    const res = await createGalleryItem(payload);
    if (res.success) {
      fetchItems();
      setIsModalOpen(false);
    } else {
      alert(res.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item? It will be removed permanently from the public gallery.')) {
      return;
    }

    const res = await deleteGalleryItem(id);
    if (res.success) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Gallery Media Manager</h1>
          <p>Add new outreach photos to the public gallery, group them by category, or prune old assets.</p>
        </div>
        <button onClick={openAddModal} className="btn btn-primary">
          ➕ Add Media Item
        </button>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className={styles.loadingState}>
          <p>Loading media catalog...</p>
        </div>
      ) : items.length > 0 ? (
        <div className={styles.galleryGrid}>
          {items.map(item => (
            <div key={item.id} className={styles.mediaCard}>
              <div className={styles.imgWrapper}>
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className={styles.mediaImg}
                />
                <span className={styles.tagBadge}>{item.category}</span>
              </div>
              <div className={styles.cardContent}>
                <h4>{item.title}</h4>
                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm btn-block"
                  >
                    Delete Media
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>No media files cataloged yet. Start building your catalog by adding an outreach photo!</p>
        </div>
      )}

      {/* Upload/Add Modal Overlay */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Add Gallery Media</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSave} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="mediaTitle">Media Caption / Title *</label>
                <input
                  type="text"
                  id="mediaTitle"
                  required
                  placeholder="e.g., Karshi Medical Checkups Consultation"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mediaCategory">Category *</label>
                <select
                  id="mediaCategory"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="form-control"
                >
                  <option value="general">General</option>
                  <option value="education">Education</option>
                  <option value="empowerment">Empowerment</option>
                  <option value="outreach">Outreach & Relief</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mediaUrl">Image URL *</label>
                <input
                  type="url"
                  id="mediaUrl"
                  required
                  placeholder="e.g., https://images.unsplash.com/... or Supabase storage path"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline-dark"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? 'Adding...' : 'Add Media'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
