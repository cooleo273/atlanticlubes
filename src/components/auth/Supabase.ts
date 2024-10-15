// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and API key
const SUPABASE_URL = 'https://vkqgunmfpvjkftehgtio.supabase.co';
const SUPABASE_API_KEY = 'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcWd1bm1mcHZqa2Z0ZWhndGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NDAyNDMsImV4cCI6MjA0NDQxNjI0M30';

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
