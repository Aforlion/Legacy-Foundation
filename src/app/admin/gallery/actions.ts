'use server';

import { createSupabaseServerClient } from '@/lib/supabase-server';

export interface ActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export async function createGalleryItem(payload: {
  title: string;
  image_url: string;
  category: string;
}): Promise<ActionResponse> {
  if (!payload.title || !payload.image_url) {
    return {
      success: false,
      message: 'Title and Image URL are required fields.',
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('gallery')
      .insert([
        {
          title: payload.title,
          image_url: payload.image_url,
          category: payload.category || 'general',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Media item successfully added to gallery!',
      data,
    };
  } catch (err: any) {
    console.error('Error creating gallery item:', err);
    return {
      success: false,
      message: err.message || 'Failed to create gallery item.',
    };
  }
}

export async function deleteGalleryItem(id: string): Promise<ActionResponse> {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
      message: 'Media item successfully deleted from gallery.',
    };
  } catch (err: any) {
    console.error('Error deleting gallery item:', err);
    return {
      success: false,
      message: err.message || 'Failed to delete gallery item.',
    };
  }
}
