'use client';

import PlayButton from '@/components/PlayButton';
import { fallBackImagePath } from '@/constants/data';
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/typings';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  song: Song;
  onClick: (id: string) => void;
};

const SongItem = ({ song, onClick }: Props) => {
  const [imageSrc, setImageSrc] = useState<string>(fallBackImagePath);
  const publicUrl = useLoadImage(song);

  useEffect(() => {
    if (publicUrl) {
      setImageSrc(publicUrl);
    }
  }, [publicUrl]);

  const handleImageError = () => {
    setImageSrc(fallBackImagePath);
  };

  return (
    <div
      className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition-all p-3'
      onClick={() => onClick(song.id)}>
      <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
        <Image
          fill
          priority
          className='object-cover'
          sizes='100%'
          onError={handleImageError}
          src={imageSrc}
          alt='cover-image'
        />
      </div>
      <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
        <p className='font-semibold truncate w-full'>{song.title}</p>
        <p className='capitalize text-neutral-400 text-sm w-full truncate'>
          By {song.author}
        </p>
      </div>
      <div className='absolute bottom-24 right-5'>
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
