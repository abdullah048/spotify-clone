'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import Button from './Button';
import useAuthModalStore from '@/hooks/useAuthModalStore';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import usePlayer from '@/hooks/usePlayerStore';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const { onOpen } = useAuthModalStore();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const { reset } = usePlayer();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    reset();
    router.refresh();

    if (error) {
      toast.error(error.message ?? 'Something went wrong');
    }
  };
  return (
    <header
      className={cn('h-fit bg-gradient-to-b from-emerald-800 p-6', className)}>
      <div className='w-full mb-4 flex items-center justify-between'>
        <div className='hidden md:flex gap-x-2 items-center'>
          <button
            className='flex items-center justify-center hover:opacity-75 transition-all'
            onClick={() => {
              router.back();
            }}>
            <RxCaretLeft size={26} className='text-white' />
          </button>
          <button
            className='flex items-center justify-center hover:opacity-75 transition-all'
            onClick={() => {
              router.forward();
            }}>
            <RxCaretRight size={26} className='text-white' />
          </button>
        </div>
        <div className='flex gap-x-2 items-center md:hidden'>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition-all'>
            <HiHome className='text-black' size={22} />
          </button>
          <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition-all'>
            <BiSearch className='text-black' size={22} />
          </button>
        </div>
        <div
          className='flex justify-between items-center gap-x-4
        '>
          {user ? (
            <div
              className='
            flex gap-x-4 items-center
            '>
              <Button onClick={handleLogout} className='bg-white px-6 py-2'>
                Logout
              </Button>
              <Button
                onClick={() => router.push('/account')}
                className='bg-white'>
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => {
                    onOpen('sign_up');
                  }}
                  className='bg-transparent text-neutral-300 font-medium'>
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className='bg-white px-5 py-1'
                  onClick={() => {
                    onOpen('sign_in');
                  }}>
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </header>
  );
};

export default Header;
