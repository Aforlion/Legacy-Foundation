'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { updateVolunteerStatus, updateVolunteerNotes } from './actions';
import styles from './volunteers.module.css';

export default function VolunteersAdminPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVol, setSelectedVol] = useState<any | null>(null);
  const [notesText, setNotesText] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // tracks button loading states

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVolunteers(data || []);
    } catch (err) {
      console.error('Error fetching volunteers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    setActionLoading(newStatus);
    const res = await updateVolunteerStatus(id, newStatus);
    if (res.success) {
      // update state locally
      setVolunteers(prev =>
        prev.map(v => (v.id === id ? { ...v, status: newStatus } : v))
      );
      if (selectedVol && selectedVol.id === id) {
        setSelectedVol((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } else {
      alert(res.message);
    }
    setActionLoading(null);
  };

  const handleSaveNotes = async () => {
    if (!selectedVol) return;
    setSavingNotes(true);
    const res = await updateVolunteerNotes(selectedVol.id, notesText);
    if (res.success) {
      setVolunteers(prev =>
        prev.map(v => (v.id === selectedVol.id ? { ...v, admin_notes: notesText } : v))
      );
      setSelectedVol((prev: any) => prev ? { ...prev, admin_notes: notesText } : null);
      alert('Review notes saved!');
    } else {
      alert(res.message);
    }
    setSavingNotes(false);
  };

  const openDetails = (vol: any) => {
    setSelectedVol(vol);
    setNotesText(vol.admin_notes || '');
  };

  const filteredVolunteers = volunteers.filter(vol => {
    const matchesSearch =
      vol.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vol.skills?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || vol.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Volunteer Applications Manager</h1>
        <p>Review submitted skills, adjust application statuses, and add internal notes.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className={styles.searchBar}>
        <div className={styles.inputGroup}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, email, phone, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.selectFilter}
        >
          <option value="all">All Statuses</option>
          <option value="pending">⏳ Pending</option>
          <option value="approved">✅ Approved</option>
          <option value="rejected">❌ Rejected</option>
        </select>
      </div>

      {/* Main Table Content */}
      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loadingState}>
            <p>Loading volunteer records...</p>
          </div>
        ) : filteredVolunteers.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Skills Focus</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map(vol => (
                  <tr key={vol.id}>
                    <td>
                      <strong>{vol.full_name}</strong>
                    </td>
                    <td>{vol.email}</td>
                    <td>{vol.phone || 'N/A'}</td>
                    <td className={styles.skillsCol}>{vol.skills || 'None stated'}</td>
                    <td>{new Date(vol.created_at).toLocaleDateString('en-NG')}</td>
                    <td>
                      <span className={`badge-status status-${vol.status}`}>
                        {vol.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => openDetails(vol)}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No volunteer applications match your filters.</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedVol && (
        <div className={styles.modalOverlay} onClick={() => setSelectedVol(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Review Application</h2>
              <button className={styles.closeBtn} onClick={() => setSelectedVol(null)}>×</button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.volMetaGrid}>
                <div>
                  <span className={styles.metaLabel}>Full Name:</span>
                  <strong>{selectedVol.full_name}</strong>
                </div>
                <div>
                  <span className={styles.metaLabel}>Email Address:</span>
                  <strong>{selectedVol.email}</strong>
                </div>
                <div>
                  <span className={styles.metaLabel}>Phone Number:</span>
                  <strong>{selectedVol.phone || 'N/A'}</strong>
                </div>
                <div>
                  <span className={styles.metaLabel}>Date Applied:</span>
                  <strong>{new Date(selectedVol.created_at).toLocaleString('en-NG')}</strong>
                </div>
              </div>

              <div className={styles.detailBlock}>
                <span className={styles.metaLabel}>Skills / Area of Interest:</span>
                <p className={styles.detailBox}>{selectedVol.skills || 'No skills entered.'}</p>
              </div>

              <div className={styles.detailBlock}>
                <span className={styles.metaLabel}>Applicant Message / Motivation:</span>
                <p className={styles.detailBox}>{selectedVol.message || 'No motivation message entered.'}</p>
              </div>

              {/* Status Manager */}
              <div className={styles.statusBlock}>
                <span className={styles.metaLabel}>Current Status:</span>
                <div className={styles.statusRow}>
                  <span className={`badge-status status-${selectedVol.status} ${styles.largeBadge}`}>
                    {selectedVol.status}
                  </span>
                  
                  <div className={styles.statusButtons}>
                    <button
                      onClick={() => handleStatusChange(selectedVol.id, 'approved')}
                      disabled={actionLoading === 'approved'}
                      className="btn btn-success btn-sm"
                    >
                      {actionLoading === 'approved' ? 'Saving...' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedVol.id, 'rejected')}
                      disabled={actionLoading === 'rejected'}
                      className="btn btn-danger btn-sm"
                    >
                      {actionLoading === 'rejected' ? 'Saving...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedVol.id, 'pending')}
                      disabled={actionLoading === 'pending'}
                      className="btn btn-outline-dark btn-sm"
                    >
                      {actionLoading === 'pending' ? 'Saving...' : 'Reset to Pending'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes Area */}
              <div className={styles.notesBlock}>
                <span className={styles.metaLabel}>Internal Administrative Notes:</span>
                <textarea
                  rows={4}
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Record interview status, assigned programs, reference checks..."
                  className="form-control"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="btn btn-primary btn-block mt-2"
                >
                  {savingNotes ? 'Saving Notes...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
