'use client';

import useAuthModalStore from '@/hooks/useAuthModalStore';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
  songId: string;
};

const LikedButton = ({ songId }: Props) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const supabaseClient = useSupabaseClient();
  const { onOpen, onClose } = useAuthModalStore();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('liked_songs')
          .select('*')
          .match({ user_id: user.id, song_id: songId })
          .single();

        if (!error && data) {
          setIsLiked(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error: =>', error);
          toast.error(error.message ?? 'Error while fetching data');
        }
      }
    };

    fetchData();
  }, [user?.id, songId, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleSelectFavorite = async () => {
    if (!user) {
      return onOpen('sign_in');
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .match({ user_id: user.id, song_id: songId });

      if (error) {
        console.log('Error: =>', error);
        toast.error(
          error.message ?? 'Something went wrong while removing the song.'
        );
        return;
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ user_id: user.id, song_id: songId });

      if (error) {
        console.log('Error: =>', error);
        toast.error(
          error.message ?? 'Something went wrong while liking the song.'
        );
        return;
      } else {
        setIsLiked(true);
        toast(t => (
          <p className='flex items-center gap-x-4 justify-between relative'>
            <Image
              className='h-10 w-10 rounded-md'
              width={10}
              height={10}
              src='/images/liked.png'
              alt='Liked'
              sizes='100%'
            />
            <span>Added to liked songs</span>
          </p>
        ));
      }
    }

    router.refresh();
  };

  return (
    <button
      className='hover:opacity-75 transition-all'
      onClick={handleSelectFavorite}>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={22} />
    </button>
  );
};

export default LikedButton;
