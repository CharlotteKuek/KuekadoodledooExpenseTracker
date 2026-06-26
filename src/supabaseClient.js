import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anon) {
  // Shown in the browser console if you forgot to add your keys.
  console.error('Missing Supabase keys. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file (and to Vercel).');
}

export const supabase = createClient(url || 'https://placeholder.supabase.co', anon || 'placeholder', {
  auth: { persistSession: true, autoRefreshToken: true },
});
