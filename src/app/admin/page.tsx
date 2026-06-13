import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import styles from './adminDashboard.module.css';

async function getDashboardData() {
  const supabase = await createSupabaseServerClient();
  
  try {
    const [volunteersRes, newsRes, galleryRes, latestVolunteersRes] = await Promise.all([
      supabase.from('volunteers').select('*', { count: 'exact', head: true }),
      supabase.from('news_events').select('*', { count: 'exact', head: true }),
      supabase.from('gallery').select('*', { count: 'exact', head: true }),
      supabase.from('volunteers').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

    // Pending count
    const pendingRes = await supabase.from('volunteers').select('*', { count: 'exact', head: true }).eq('status', 'pending');

    return {
      volunteersCount: volunteersRes.count || 0,
      pendingCount: pendingRes.count || 0,
      newsCount: newsRes.count || 0,
      galleryCount: galleryRes.count || 0,
      latestVolunteers: latestVolunteersRes.data || [],
    };
  } catch (err) {
    console.error('Error fetching admin dashboard data:', err);
    return {
      volunteersCount: 0,
      pendingCount: 0,
      newsCount: 0,
      galleryCount: 0,
      latestVolunteers: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Operational summary and quick action metrics for SJN-LF.</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.label}>Pending Applications</span>
            <span className={`${styles.value} ${data.pendingCount > 0 ? styles.alertText : ''}`}>
              {data.pendingCount}
            </span>
          </div>
          <span className={styles.icon}>⏳</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.label}>Total Volunteers</span>
            <span className={styles.value}>{data.volunteersCount}</span>
          </div>
          <span className={styles.icon}>👥</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.label}>News & Events Posts</span>
            <span className={styles.value}>{data.newsCount}</span>
          </div>
          <span className={styles.icon}>📰</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.label}>Gallery Assets</span>
            <span className={styles.value}>{data.galleryCount}</span>
          </div>
          <span className={styles.icon}>🖼️</span>
        </div>
      </div>

      {/* Latest Signups Section */}
      <div className={styles.mainGrid}>
        <div className={styles.listCard}>
          <div className={styles.cardHeader}>
            <h3>Latest Volunteer Applications</h3>
            <Link href="/admin/volunteers" className={styles.viewAll}>
              View All
            </Link>
          </div>

          <div className={styles.tableWrapper}>
            {data.latestVolunteers.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.latestVolunteers.map((vol: any) => (
                    <tr key={vol.id}>
                      <td><strong>{vol.full_name}</strong></td>
                      <td>{vol.email}</td>
                      <td>{new Date(vol.created_at).toLocaleDateString('en-NG')}</td>
                      <td>
                        <span className={`badge-status status-${vol.status}`}>
                          {vol.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.emptyState}>
                <p>No volunteer applications recorded yet.</p>
                <Link href="/volunteer" target="_blank" className="btn btn-outline-primary mt-3">
                  Open Volunteer Form
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className={styles.actionsCard}>
          <h3>Quick Administration Actions</h3>
          <div className={styles.actionsGrid}>
            <Link href="/admin/volunteers" className={styles.actionBtn}>
              <span>👥 Review Volunteers</span>
              <p>Process pending applications and record reviews.</p>
            </Link>
            <Link href="/admin/news" className={styles.actionBtn}>
              <span>📰 Publish Article</span>
              <p>Post a news update or create a new community event.</p>
            </Link>
            <Link href="/admin/gallery" className={styles.actionBtn}>
              <span>🖼️ Upload Gallery Photos</span>
              <p>Add fresh media files with category tags.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
