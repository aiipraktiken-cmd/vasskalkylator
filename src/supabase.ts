import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xhshbefyocgiecvbfbdv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_0QJcjFAHhEY-r0TWxOIZsw_8wgUrsvg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Stats {
  visits: number;
  calculations: number;
  total_hectares: number;
}

export async function fetchStats(): Promise<Stats | null> {
  const { data, error } = await supabase.from('stats').select('*').single();
  if (error) return null;
  return data as Stats;
}

export async function trackVisit() {
  await supabase.rpc('increment_stats', { p_visits: 1 });
}

export async function trackCalculation(hectares: number) {
  await supabase.rpc('increment_stats', {
    p_calculations: 1,
    p_hectares: hectares,
  });
}
