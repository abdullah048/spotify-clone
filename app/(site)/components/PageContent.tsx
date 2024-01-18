'use client';

import { Song } from '@/typings';
import React from 'react';
import SongItem from './SongItem';
import useOnPlay from '@/hooks/useOnPlay';

type Props = {
  songs: Song[];
};

const PageContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);

  const handleClick = (id: string) => {
    onPlay(id);
  };

  if (songs.length === 0) {
    return <div className='mt-4 text-neutral-400'>No songs available.</div>;
  }
  return (
    <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4'>
      {songs.map(song => (
        <SongItem song={song} key={song.id} onClick={handleClick} />
      ))}
    </div>
  );
};

export default PageContent;
