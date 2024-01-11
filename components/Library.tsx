'use client';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import useAuthModalStore from '@/hooks/useAuthModalStore';
import { useUser } from '@/hooks/useUser';
import useUploadModalStore from '@/hooks/useUploadModalStore';

const Library = () => {
  const authModal = useAuthModalStore();
  const uploadModal = useUploadModalStore();
  const { user } = useUser();
  const handleClick = () => {
    if (!user) {
      return authModal.onOpen('sign_in');
    }

    // TODO: Check for subscriptions

    return uploadModal.onOpen();
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
      <div className='flex flex-col gap-y-2 mt-4 px-5'>List of songs.</div>
    </div>
  );
};

export default Library;
