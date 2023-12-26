'use client';

import { UserContextProvider } from '@/hooks/useUser';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;
