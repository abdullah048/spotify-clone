'use client';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import useAuthModalStore from '@/hooks/useAuthModalStore';
import { useUser } from '@/hooks/useUser';
import useUploadModalStore from '@/hooks/useUploadModalStore';
import { Song } from '@/typings';
import MediaItem from './MediaItem';

type Props = {
  songs: Song[];
};

const Library = ({ songs }: Props) => {
  const authModal = useAuthModalStore();
  const uploadModal = useUploadModalStore();
  const { user } = useUser();

  const handleMediaClick = (id: string) => {};

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen('sign_in');
    }

    // TODO: Check for subscriptions

    return uploadModal.onOpen();
  };

  const renderSongList = () => {
    if (songs.length === 0) {
      return <div className='text-neutral-400'>No songs available.</div>;
    }
    return (
      <div>
        {songs.map(song => (
          <MediaItem key={song.id} onClick={handleMediaClick} song={song} />
        ))}
      </div>
    );
  };

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist size={22} className='text-neutral-400' />
          <p className='text-neutral-400 font-medium text-md'>Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleClick}
          size={16}
          className='text-neutral-400 cursor-pointer hover:text-white transition-all'
        />
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-2'>{renderSongList()}</div>
    </div>
  );
};

export default Library;
