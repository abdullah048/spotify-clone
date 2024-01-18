'use client';
import { Song } from '@/typings';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import LikedButton from './LikedButton';
import MediaItem from './MediaItem';
import { useMediaQuery } from 'react-responsive';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayerStore';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

type Props = {
  song: Song;
  url: string;
};

const PlayerContent = ({ song, url }: Props) => {
  const player = usePlayer();
  const [volume, setVolume] = useState<number>(
    JSON.parse(localStorage.getItem('volume')!) || 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const isSmallMobileView = useMediaQuery({
    query: '(max-width: 435px)',
  });
  const isLargeMobileView = useMediaQuery({
    query: '(max-width: 585px)',
  });
  const handleOnClick = (id: string) => {};

  const handleVolumeOnClick = () => {
    if (volume !== 0) {
      setVolume(0);
    } else {
      try {
        const storedVolume = JSON.parse(localStorage.getItem('volume')!);
        setVolume(storedVolume);
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error: =>', error.message);
        }
      }
    }
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex(id => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex(id => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const [play, { pause, sound, duration }] = useSound(url, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 h-full'>
      <div
        className={`${isSmallMobileView ? 'block' : 'flex'} md:block w-full`}>
        <div className='flex items-center gap-x-4'>
          <MediaItem onClick={handleOnClick} song={song} />
          <LikedButton songId={song.id} />
        </div>
      </div>
      <div className='flex md:hidden gap-x-4 col-auto w-full justify-end items-center'>
        <div
          className='h-10 w-10 flex items-center justify-center cursor-pointer bg-white p-1 rounded-full'
          onClick={handlePlay}>
          <Icon size={30} className='text-black' />
        </div>
        {!isLargeMobileView && (
          <div className='w-1/2'>
            <div className='flex items-center gap-x-2 '>
              <VolumeIcon
                className='cursor-pointer'
                onClick={handleVolumeOnClick}
                size={30}
              />
              <Slider
                value={volume}
                onChange={newVolume => {
                  setVolume(newVolume);
                  localStorage.setItem('volume', JSON.stringify(newVolume));
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className='hidden h-full w-full md:flex md:flex-col justify-center items-center'>
        <div className='hidden h-full w-full md:flex justify-center items-center max-w-[722px] gap-x-6 pl-28'>
          <AiFillStepBackward
            className='text-neutral-400 cursor-pointer hover:text-white transition-all'
            onClick={onPlayPrevious}
            size={30}
          />
          <div
            className='h-10 w-10 flex items-center justify-center cursor-pointer bg-white p-1 rounded-full'
            onClick={handlePlay}>
            <Icon size={30} className='text-black' />
          </div>
          <AiFillStepForward
            className='text-neutral-400 cursor-pointer hover:text-white transition-all'
            onClick={onPlayNext}
            size={30}
          />
        </div>
        {/* <div className='w-[70%]'>
          <PlayerProgressbar
            duration={duration}
            onChange={newValue => {
              sound?.setDuration(newValue);
            }}
          />
        </div> */}
      </div>
      <div className='hidden md:flex w-full justify-end pr-2'>
        <div className='flex items-center gap-x-2 w-[120px]'>
          <VolumeIcon
            className='cursor-pointer'
            onClick={handleVolumeOnClick}
            size={30}
          />
          <Slider
            value={volume}
            onChange={newVolume => {
              setVolume(newVolume);
              localStorage.setItem('volume', JSON.stringify(newVolume));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
