'use client';
import { Song } from '@/typings';
import MediaItem from './MediaItem';
import LikedButton from './LikedButton';

type Props = {
  song: Song;
  url: string;
};

const PlayerContent = ({ song, url }: Props) => {
  const handleOnClick = (id: string) => {};

  return (
    <div className='grid grid-cols md:grid-cols-3 h-full '>
      <div className='flex w-full'>
        <div className='flex items-center gap-x-4'>
          <MediaItem onClick={handleOnClick} song={song} />
          <LikedButton songId={song.id} />
        </div>
      </div>
      <div className=''></div>
    </div>
  );
};

export default PlayerContent;
