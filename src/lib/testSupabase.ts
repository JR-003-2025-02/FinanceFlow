import { supabase } from '@/integrations/supabase/client';

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  // Test auth connection
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  console.log('Auth test:', user ? 'Connected' : 'Not connected', authError || '');

  // Test profiles table
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
  
  console.log('Profiles table test:', profileError ? 'Error' : 'Success');
  if (profileError) {
    console.error('Profiles table error:', profileError);
  }
}

testConnection();
