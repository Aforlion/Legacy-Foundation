'use server';

import { supabase } from '@/lib/supabase';

export interface SubmitResult {
  success: boolean;
  message: string;
}

export async function submitVolunteerApplication(formData: FormData): Promise<SubmitResult> {
  const fullName = formData.get('fullName')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();
  const skills = formData.get('skills')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!fullName || !email) {
    return {
      success: false,
      message: 'Full Name and Email address are required fields.',
    };
  }

  try {
    // Write directly to volunteers table
    const { error } = await supabase.from('volunteers').insert([
      {
        full_name: fullName,
        email: email,
        phone: phone || null,
        skills: skills || null,
        message: message || null,
        status: 'pending',
      },
    ]);

    if (error) {
      console.error('Database insertion error:', error);
      throw new Error(error.message);
    }

    return {
      success: true,
      message: 'Your application has been received successfully! Our team will contact you soon.',
    };
  } catch (err: any) {
    console.error('Error in submitVolunteerApplication:', err);
    return {
      success: false,
      message: err.message || 'An error occurred while submitting your application. Please try again.',
    };
  }
}
