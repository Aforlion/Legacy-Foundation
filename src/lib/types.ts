// ============================================================
// Database type definitions — matches 001_initial_schema.sql
// ============================================================

export type VolunteerStatus = 'pending' | 'approved' | 'rejected';
export type ContentType = 'news' | 'event';

export interface Volunteer {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  skills: string | null;
  message: string | null;
  status: VolunteerStatus;
  admin_notes: string | null;
  created_at: string;
}

export interface NewsEvent {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: ContentType;
  event_date: string | null;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Stat {
  key: string;
  value: string;
  label: string;
  updated_at: string;
}
