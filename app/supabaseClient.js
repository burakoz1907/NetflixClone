
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqlzbvuxwtrurzbbhqtk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbHpidnV4d3RydXJ6YmJocXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3OTc0NDQsImV4cCI6MjA0MDM3MzQ0NH0.zQC6W_e5NqVIct4PbXkCrT2u-z1Qp4Xkjll5piJ1Msc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
