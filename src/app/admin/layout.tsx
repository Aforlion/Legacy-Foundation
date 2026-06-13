import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { logout } from './login/actions';
import styles from './adminLayout.module.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  // If there is no authenticated session, render children directly (e.g., the login card)
  // to avoid a redirect loop and prevent showing the admin sidebar on the login page.
  if (!session) {
    return <>{children}</>;
  }

  const handleLogoutAction = async () => {
    'use server';
    await logout();
    redirect('/admin/login');
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h2>SJN-LF Admin</h2>
          <span className={styles.roleTag}>Global Administrator</span>
        </div>

        <nav className={styles.navMenu}>
          <Link href="/admin" className={styles.navLink}>
            📊 Dashboard
          </Link>
          <Link href="/admin/volunteers" className={styles.navLink}>
            👥 Volunteers
          </Link>
          <Link href="/admin/news" className={styles.navLink}>
            📰 News & Events
          </Link>
          <Link href="/admin/gallery" className={styles.navLink}>
            🖼️ Gallery Manager
          </Link>
        </nav>

        <div className={styles.footer}>
          <form action={handleLogoutAction}>
            <button type="submit" className={styles.logoutBtn}>
              🚪 Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Panel */}
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div className={styles.userInfo}>
            <span>Welcome back, <strong>{session.user.email}</strong></span>
          </div>
          <Link href="/" target="_blank" className={styles.visitSite}>
            🌐 Visit Public Website
          </Link>
        </header>
        <div className={styles.pageBody}>{children}</div>
      </main>
    </div>
  );
}
