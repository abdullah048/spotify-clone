'use client';

import LikedButton from '@/components/LikedButton';
import MediaItem from '@/components/MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/typings';
import React from 'react';

type Props = {
  songs: Song[];
};

const SearchContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <div className='mt-4 text-neutral-400'>No songs found.</div>;
  }

  const handleOnClick = (id: string) => {
    onPlay(id);
  };

  return (
    <div className='flex flex-col gap-y-2 w-full'>
      {songs.map(song => (
        <div key={song.id} className='flex items-center gap-x-4 w-full'>
          <div className='flex-1'>
            <MediaItem onClick={handleOnClick} song={song} />
          </div>
          <LikedButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
