'use server';

import { createSupabaseServerClient } from '@/lib/supabase-server';

export interface LoginResult {
  success: boolean;
  message: string;
}

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: 'Both Email and Password are required fields.',
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error details:', error);
      return {
        success: false,
        message: error.message || 'Invalid email or password.',
      };
    }

    return {
      success: true,
      message: 'Login successful! Redirecting...',
    };
  } catch (err: any) {
    console.error('Error in login action:', err);
    return {
      success: false,
      message: err.message || 'An unexpected error occurred during login.',
    };
  }
}

export async function logout() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Error in logout action:', err);
  }
}
