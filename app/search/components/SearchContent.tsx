'use client';

import MediaItem from '@/components/MediaItem';
import { Song } from '@/typings';
import React from 'react';

type Props = {
  songs: Song[];
};

const SearchContent = ({ songs }: Props) => {
  if (songs.length === 0) {
    return <div className='mt-4 text-neutral-400'>No songs found.</div>;
  }

  const handleOnClick = (id: string) => {};

  return (
    <div className='flex flex-col gap-y-2 w-full'>
      {songs.map(song => (
        <div key={song.id} className='flex items-center gap-x-4 w-full'>
          <div className='flex-1'>
            <MediaItem onClick={handleOnClick} song={song} />
          </div>
          {/* TODO: Add like button here... */}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
