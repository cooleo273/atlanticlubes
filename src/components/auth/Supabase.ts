// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and API key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are missing');
}



export const supabase = createClient(supabaseUrl, supabaseKey);
