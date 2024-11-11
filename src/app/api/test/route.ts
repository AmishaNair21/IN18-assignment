
import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
    const { data, error } = await supabase
    .from('registereduser')
    .select('*')
    .limit(1); // Fetching one user, you can modify this as needed

  if (error) {
    return new Response('Error fetching data: ' + error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
