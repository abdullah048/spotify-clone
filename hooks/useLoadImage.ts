import { Song } from '@/typings';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useLoadImage = (song: Song): string | null => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from('images')
    .getPublicUrl(song.image_path);

  return imageData.publicUrl as string;
};

export default useLoadImage;
