'use client';

import useAuthModalStore from '@/hooks/useAuthModalStore';
import Modal from './Modal';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';

const AuthModal = () => {
  const { isOpen, onClose, view } = useAuthModalStore();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();

  const handleModalChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (session) {
      router.replace('/');
      onClose();
    }
  }, [onClose, router, session]);

  return (
    <Modal
      isOpen={isOpen}
      title='Welcome back'
      description='Login to your account'
      onChange={handleModalChange}>
      <Auth
        view={view}
        theme='dark'
        magicLink
        providers={['github', 'google', 'gitlab']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
