import { createClient } from '@supabase/supabase-js';

export function db() {
  const supabaseUrl = 'https://rtxbknmfizxrpqievyyz.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0eGJrbm1maXp4cnBxaWV2eXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg5OTI2NjUsImV4cCI6MTk4NDU2ODY2NX0.xxXWMmIEF0XdrkTv-Jf838hrfbLssEmo2Q-VDhlluZk';
  const supabase = createClient(supabaseUrl, supabaseKey);

  return supabase;
}
