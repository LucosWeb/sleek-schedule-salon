import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Usando o cliente do Supabase já configurado pelo Lovable
export const supabase = createClient<Database>(
  'https://wvpetdpsvtylzghhrevz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cGV0ZHBzdnR5bHpnaGhyZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTI0NzAsImV4cCI6MjAyNTIyODQ3MH0.Wd_dkf-RwQNyG1VFKyE_U8J8yqdP2l1oFJNJPD5vOYU'
)