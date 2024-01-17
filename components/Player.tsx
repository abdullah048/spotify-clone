'use client';

import useGetSongById from '@/hooks/useGetSongById';
import useLoadSong from '@/hooks/useLoadSong';
import usePlayer from '@/hooks/usePlayerStore';
import PlayerContent from './PlayerContent';

const Player = () => {
  const { activeId } = usePlayer();
  const { isLoading, song } = useGetSongById(activeId);
  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !activeId) {
    return null;
  }

  return (
    <div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
      <PlayerContent song={song} url={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;
