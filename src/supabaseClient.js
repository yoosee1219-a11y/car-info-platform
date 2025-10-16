import { createClient } from "@supabase/supabase-js";

// 환경변수가 없으면 더미 값 사용 (로컬 개발용)
const supabaseUrl =
  process.env.REACT_APP_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase가 실제로 설정되어 있는지 여부 플래그 (placeholder면 미설정)
export const isSupabaseConfigured = !supabaseUrl.includes("placeholder");
