'use server';

import { createSupabaseServerClient } from '@/lib/supabase-server';

export interface ActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function createOrUpdateNewsEvent(
  id: string | null,
  payload: {
    title: string;
    slug: string;
    content: string;
    type: 'news' | 'event';
    event_date: string | null;
    cover_image: string | null;
    published: boolean;
  }
): Promise<ActionResponse> {
  if (!payload.title || !payload.slug || !payload.content) {
    return {
      success: false,
      message: 'Title, Slug, and Content are required fields.',
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    
    const dbPayload = {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      type: payload.type,
      event_date: payload.type === 'event' ? payload.event_date || null : null,
      cover_image: payload.cover_image || null,
      published: payload.published,
      updated_at: new Date().toISOString(),
    };

    if (id) {
      // Update
      const { data, error } = await supabase
        .from('news_events')
        .update(dbPayload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: 'Article successfully updated!',
        data,
      };
    } else {
      // Insert
      const { data, error } = await supabase
        .from('news_events')
        .insert([{ ...dbPayload, created_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        message: 'Article successfully published/created!',
        data,
      };
    }
  } catch (err: any) {
    console.error('Error saving news/event:', err);
    return {
      success: false,
      message: err.message || 'Failed to save news/event entry.',
    };
  }
}

export async function togglePublishNewsEvent(
  id: string,
  published: boolean
): Promise<ActionResponse> {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('news_events')
      .update({ published })
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
      message: `Article publication status changed to ${published ? 'published' : 'draft'}.`,
    };
  } catch (err: any) {
    console.error('Error toggling publication status:', err);
    return {
      success: false,
      message: err.message || 'Failed to change publication status.',
    };
  }
}

export async function deleteNewsEvent(id: string): Promise<ActionResponse> {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('news_events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
      message: 'Article successfully deleted.',
    };
  } catch (err: any) {
    console.error('Error deleting news/event:', err);
    return {
      success: false,
      message: err.message || 'Failed to delete news/event.',
    };
  }
}
