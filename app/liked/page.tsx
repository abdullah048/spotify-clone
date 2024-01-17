import getLikedSongsByUser from '@/actions/getLikedSongsByCurrentUser';
import Header from '@/components/Header';
import Image from 'next/image';
import LikedContent from './components/LikedContent';

export const revalidate = 0;

const LikedPage = async () => {
  const likedSongs = await getLikedSongsByUser();

  return (
    <div className='bg-neutral-900 w-full h-full rounded-lg overflow-hidden overflow-y-auto'>
      <Header>
        <div className='mt-20'>
          <div className='flex flex-col md:flex-row items-center gap-x-5'>
            <div className='relative h-32 w-32 lg:h-44 lg:w-44'>
              <Image
                priority
                className='object-cover rounded-md'
                fill
                src='/images/liked.png'
                sizes='100%'
                alt='Liked-png'
              />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
              <p className='hidden md:block font-semibold text-sm'>Playlist</p>
              <h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold'>
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <div className='px-6'>
        <LikedContent songs={likedSongs} />
      </div>
    </div>
  );
};

export default LikedPage;
