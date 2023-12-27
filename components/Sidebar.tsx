'use client';
import { usePathname } from 'next/navigation';
import { FC, ReactNode, useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Box from './Box';
import SidebarItem from './SidebarItem';
import Library from './Library';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname]
  );
  return (
    <div className='flex h-full'>
      <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
        <Box className='flex flex-col gap-y-4 px-5 py-4'>
          {routes.map(route => (
            <SidebarItem key={route.label} {...route} />
          ))}
        </Box>
        <Box className='overflow-y-auto h-full'>
          <Library />
        </Box>
      </div>
      <main className='w-full flex-1 overflow-y-auto py-2 pr-2'>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
