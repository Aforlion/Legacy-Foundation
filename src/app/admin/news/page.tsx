'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { createOrUpdateNewsEvent, deleteNewsEvent, togglePublishNewsEvent } from './actions';
import styles from './newsAdmin.module.css';

export default function NewsAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'news' | 'event'>('news');
  const [eventDate, setEventDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [published, setPublished] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (!editId) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  }, [title, editId]);

  const openAddModal = () => {
    setEditId(null);
    setTitle('');
    setSlug('');
    setContent('');
    setType('news');
    setEventDate('');
    setCoverImage('');
    setPublished(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setContent(item.content);
    setType(item.type);
    setEventDate(item.event_date || '');
    setCoverImage(item.cover_image || '');
    setPublished(item.published);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      slug,
      content,
      type,
      event_date: type === 'event' ? eventDate : null,
      cover_image: coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800', // default cover fallback
      published,
    };

    const res = await createOrUpdateNewsEvent(editId, payload);
    if (res.success) {
      fetchItems();
      setIsModalOpen(false);
    } else {
      alert(res.message);
    }
    setSaving(false);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    const res = await togglePublishNewsEvent(id, nextStatus);
    if (res.success) {
      setItems(prev =>
        prev.map(item => (item.id === id ? { ...item, published: nextStatus } : item))
      );
    } else {
      alert(res.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you absolutely sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    const res = await deleteNewsEvent(id);
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
          <h1>News & Events Manager</h1>
          <p>Publish fresh news updates, announcements, or calendar event listings.</p>
        </div>
        <button onClick={openAddModal} className="btn btn-primary">
          ➕ Create New Post
        </button>
      </div>

      {/* Main Table */}
      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loadingState}>
            <p>Loading news database...</p>
          </div>
        ) : items.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Date Scheduled</th>
                  <th>Status</th>
                  <th>Published Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <strong className={styles.titleText}>{item.title}</strong>
                      <span className={styles.slugText}>/{item.slug}</span>
                    </td>
                    <td>
                      <span className={`badge-status ${item.type === 'event' ? styles.badgeEvent : styles.badgeNews}`}>
                        {item.type}
                      </span>
                    </td>
                    <td>{item.type === 'event' && item.event_date ? new Date(item.event_date).toLocaleDateString('en-NG') : 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleTogglePublish(item.id, item.published)}
                        className={`${styles.toggleBtn} ${item.published ? styles.publishedBtn : styles.draftBtn}`}
                      >
                        {item.published ? '🟢 Published' : '⚪ Draft'}
                      </button>
                    </td>
                    <td>{new Date(item.created_at).toLocaleDateString('en-NG')}</td>
                    <td>
                      <div className={styles.actionsRow}>
                        <button
                          onClick={() => openEditModal(item)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No news articles or events recorded. Get started by clicking "Create New Post"!</p>
          </div>
        )}
      </div>

      {/* Editor Modal Overlay */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editId ? 'Edit News/Event Post' : 'Create News/Event Post'}</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <form onSubmit={handleSave} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Post Type</label>
                <div className={styles.radioGroup}>
                  <label>
                    <input
                      type="radio"
                      name="postType"
                      value="news"
                      checked={type === 'news'}
                      onChange={() => setType('news')}
                    />
                    News Article
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="postType"
                      value="event"
                      checked={type === 'event'}
                      onChange={() => setType('event')}
                    />
                    Calendar Event
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="postTitle">Post Title *</label>
                <input
                  type="text"
                  id="postTitle"
                  required
                  placeholder="e.g., Early Childhood Support 2026 Launch"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="postSlug">Custom Slug (Auto-generated) *</label>
                <input
                  type="text"
                  id="postSlug"
                  required
                  placeholder="e.g., ecd-campaign-2026"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                  className="form-control"
                />
              </div>

              {type === 'event' && (
                <div className={styles.formGroup}>
                  <label htmlFor="eventDate">Event Date *</label>
                  <input
                    type="date"
                    id="eventDate"
                    required={type === 'event'}
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    className="form-control"
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="coverImage">Cover Image URL</label>
                <input
                  type="url"
                  id="coverImage"
                  placeholder="e.g., https://images.unsplash.com/... or Supabase storage path"
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="content">Post Content (HTML/Markdown/Text) *</label>
                <textarea
                  id="content"
                  required
                  rows={8}
                  placeholder="Enter detailed content..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className={styles.formGroupCheckbox}>
                <label>
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={e => setPublished(e.target.checked)}
                  />
                  Publish immediately (Visible on public pages)
                </label>
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
                  {saving ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
