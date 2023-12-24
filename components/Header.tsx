'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import Button from './Button';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const handleLogout = () => {
    alert('handle logout functionality!');
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
          <>
            <div>
              <Button
                onClick={() => {
                  alert('handle sign up');
                }}
                className='bg-transparent text-neutral-300 font-medium'>
                Sign up
              </Button>
            </div>
            <div>
              <Button
                className='bg-white px-5 py-1'
                onClick={() => {
                  alert('handle login');
                }}>
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </header>
  );
};

export default Header;
