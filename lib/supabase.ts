import { createClient } from '@supabase/supabase-js';

// Récupère ces valeurs dans ton tableau de bord Supabase (Settings > API)
const supabaseUrl = 'https://bnbebbcgkbaubpxwmemt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuYmViYmNna2JhdWJweHdtZW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMjI3NjgsImV4cCI6MjA4NDU5ODc2OH0.HlkQ4YCd6Yn-dOfTemJXX6Nmx29Ojx2iQx2kAC-nBlk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);