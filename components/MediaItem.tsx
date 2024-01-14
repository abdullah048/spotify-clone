'use client';

import { fallBackImagePath } from '@/constants/data';
import useLoadImage from '@/hooks/useLoadImage';
import { Song } from '@/typings';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Tooltip from './Tooltip';

type Props = {
  onClick?: (id: string) => void;
  song: Song;
};

const MediaItem = ({ onClick, song }: Props) => {
  const [imageSrc, setImageSrc] = useState<string>(fallBackImagePath);
  const publicUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    // TODO: Default turn on player...
  };

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
      onClick={handleClick}
      className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md'>
      <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden'>
        <Image
          fill
          priority
          className='object-cover'
          sizes='100%'
          onError={handleImageError}
          src={imageSrc}
          alt={song.title}
        />
      </div>

      <div className='flex flex-col gap-y-1 overflow-hidden'>
        <Tooltip message={song.title}>
          <p className='text-white truncate'>{song.title}</p>
        </Tooltip>
        <p className='text-neutral-400 text-sm truncate'>{song.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
