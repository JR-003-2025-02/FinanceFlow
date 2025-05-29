import { supabase } from '@/integrations/supabase/client';

async function testSignup() {
  try {
    const testUser = {
      email: 'test@example.com',
      password: 'test123456',
      fullName: 'Test User',
      username: 'testuser'
    };

    console.log('1. Starting signup test...');
    
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: testUser.email,
      password: testUser.password,
      options: {
        data: {
          full_name: testUser.fullName,
          username: testUser.username
        }
      }
    });

    if (signUpError) {
      throw signUpError;
    }

    console.log('2. Auth signup result:', { authData });

    if (!authData.user) {
      throw new Error('No user returned after signup');
    }

    console.log('3. Creating profile...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: testUser.fullName,
          username: testUser.username,
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single();

    if (profileError) {
      throw profileError;
    }

    console.log('4. Profile created successfully:', profile);
    return { success: true, user: authData.user, profile };
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error };
  }
}

testSignup().then(result => {
  console.log('Test completed:', result);
});
