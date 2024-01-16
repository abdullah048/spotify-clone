import { Song } from '@/typings';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getLikedSongsByUser = async (): Promise<Song[] | []> => {
  const supabaseServerClient = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabaseServerClient.auth.getSession();

  if (sessionError) {
    console.log('Error: =>', sessionError.message);
    return [];
  }

  const { data, error } = await supabaseServerClient
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log('Error: =>', error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map(item => ({
    ...item.songs,
  }));
};

export default getLikedSongsByUser;
