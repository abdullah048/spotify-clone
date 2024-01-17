import { Song } from '@/typings';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);

    const fetchSong = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('songs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setIsLoading(false);
          console.log('Error', error);
          return toast.error(error.message);
        }
        setSong(data);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setIsLoading(false);
          console.log('catch', error);
          return toast.error(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
