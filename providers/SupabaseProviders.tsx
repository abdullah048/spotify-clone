'use client';

import { Database } from '@/types_db';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { FC, ReactNode } from 'react';

interface SupabaseProvidersProps {
  children: ReactNode;
}

const SupabaseProviders: FC<SupabaseProvidersProps> = ({ children }) => {
  const supabase = createClientComponentClient<Database>();
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProviders;
