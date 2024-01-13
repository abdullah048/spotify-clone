import { Song } from '@/typings';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getSongs = async (): Promise<Song[]> => {
  const supabaseServerClient = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabaseServerClient
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.log('Error: =>', error);
  }

  return data || [];
};

export default getSongs;
