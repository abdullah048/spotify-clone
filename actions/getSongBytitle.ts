import { Song } from '@/typings';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getSongs from './getSongs';

const getSongByTitle = async (title: string): Promise<Song[] | []> => {
  const supabaseServerClient = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabaseServerClient
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.log('Error: =>', error.message);
  }

  return data || [];
};

export default getSongByTitle;
