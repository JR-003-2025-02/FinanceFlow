import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type UserProfile = Database['public']['Tables']['profiles']['Row'];

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (
  updates: Partial<UserProfile>
): Promise<{ data: UserProfile | null; error: Error | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { data: null, error: error as Error };
  }
};

export const createUserProfile = async (
  userId: string,
  fullName: string,
  username: string
): Promise<{ data: UserProfile | null; error: Error | null }> => {
  try {
    console.log('Creating user profile:', { userId, fullName, username });

    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          full_name: fullName,
          username: username,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      return { data: null, error: error as Error };
    }

    console.log('Profile created successfully:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Unexpected error creating profile:', error);
    return { data: null, error: error as Error };
  }
};

export const signUpUser = async (
  email: string, 
  password: string, 
  fullName: string, 
  username: string
): Promise<{ data: UserProfile | null; error: Error | null }> => {
  try {
    console.log('Starting signup process for:', email);
    
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: username
        }
      }
    });

    console.log('Auth signup result:', { authData, authError });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned after signup');

    // Then create the profile
    const { data: profileData, error: profileError } = await createUserProfile(
      authData.user.id,
      fullName,
      username
    );

    if (profileError) {
      console.error('Failed to create profile after signup:', profileError);
      return { data: null, error: profileError };
    }

    return { data: profileData, error: null };
  } catch (error) {
    console.error('Signup process failed:', error);
    return { data: null, error: error as Error };
  }
};
