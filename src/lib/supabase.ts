import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Usando o cliente do Supabase já configurado pelo Lovable
export const supabase = createClient<Database>(
  'https://wvpetdpsvtylzghhrevz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cGV0ZHBzdnR5bHpnaGhyZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNDUwMzIsImV4cCI6MjA1MDcyMTAzMn0.rwweLuswP1cvvxPS_MHBz5C3GkHM97c7IK4oXjnHiwU'
)