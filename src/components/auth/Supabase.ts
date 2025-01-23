// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase project URL and API key
const SUPABASE_URL = 'https://vkqgunmfpvjkftehgtio.supabase.co';
const SUPABASE_API_KEYON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1ZmxhZWJ4eWlwaXdyaGxwcXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3OTM0MzMsImV4cCI6MjA0NjM2OTQzM30.ptUF0JoOcawNcHNWmZZo1rzToZMDDZIHQ1X3e0QGQnY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEYON);
