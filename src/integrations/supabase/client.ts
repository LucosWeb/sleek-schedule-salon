// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wvpetdpsvtylzghhrevz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cGV0ZHBzdnR5bHpnaGhyZXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNDUwMzIsImV4cCI6MjA1MDcyMTAzMn0.rwweLuswP1cvvxPS_MHBz5C3GkHM97c7IK4oXjnHiwU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);