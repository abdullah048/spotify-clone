'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSong from '@/hooks/useLoadSong';
import usePlayer from '@/hooks/usePlayerStore';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import PlayerContent from './PlayerContent';

const Player = () => {
  const { activeId, ids, setId } = usePlayer();
  const { isLoading, song } = useGetSongById(activeId);
  const songUrl = useLoadSong(song!);

  useEffect(() => {
    let toastId;
    let timeout: any;
    if (isLoading) {
      toast.remove(toastId);
      toastId = toast.loading('Loading song');
    } else {
      toast.remove(toastId);
    }
    if (!isLoading && songUrl?.includes('null')) {
      toastId = toast.error('No file uploaded for this');
      if (ids.length === 0) {
        return;
      }
      const currentIndex = ids.findIndex(id => id === activeId);
      const nextSong = ids[currentIndex + 1];
      if (!nextSong) {
        return setId(ids[0]);
      }
      timeout = setTimeout(() => {
        setId(nextSong);
      }, 2500);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songUrl, isLoading]);

  if (!song || !songUrl || !activeId) {
    return null;
  }

  return (
    <div className='fixed bottom-0 bg-black w-full py-2 h-[90px] px-4'>
      <PlayerContent song={song} url={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;
