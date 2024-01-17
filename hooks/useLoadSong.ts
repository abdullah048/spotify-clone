import { Song } from '@/typings';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useLoadSong = (song: Song): string | null => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: songData } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.song_path);

  return songData.publicUrl as string;
};

export default useLoadSong;
