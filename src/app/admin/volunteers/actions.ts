'use server';

import { createSupabaseServerClient } from '@/lib/supabase-server';

export interface ActionResponse {
  success: boolean;
  message: string;
}

export async function updateVolunteerStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected'
): Promise<ActionResponse> {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('volunteers')
      .update({ status })
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
      message: `Volunteer status successfully updated to ${status}.`,
    };
  } catch (err: any) {
    console.error('Error updating volunteer status:', err);
    return {
      success: false,
      message: err.message || 'Failed to update volunteer status.',
    };
  }
}

export async function updateVolunteerNotes(
  id: string,
  notes: string
): Promise<ActionResponse> {
  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('volunteers')
      .update({ admin_notes: notes })
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
      message: 'Volunteer notes successfully saved.',
    };
  } catch (err: any) {
    console.error('Error updating volunteer notes:', err);
    return {
      success: false,
      message: err.message || 'Failed to update volunteer notes.',
    };
  }
}
