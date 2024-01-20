'use client';

import useSubscriptionModal from '@/hooks/useSubscriptionModalStore';
import { useUser } from '@/hooks/useUser';
import { postData } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from './Button';

type Props = {};

const AccountContent = (props: Props) => {
  const router = useRouter();
  const subscriptionModal = useSubscriptionModal();
  const { user, isLoading, subscription } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({ url: '/api/create-portal-link' });
      if (error) {
        setLoading(false);
        toast.error(error);
        return;
      }
      window.location.assign(url);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mb-7'>
      {!subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>No active plan.</p>
          <Button
            onClick={subscriptionModal.onOpen}
            className='w-full xs:w-[300px]'>
            Subscribe
          </Button>
        </div>
      )}
      {subscription && (
        <div className='flex flex-col gap-y-4'>
          <p>
            You are currently on the{' '}
            <b>{subscription.prices?.products?.name}</b>
          </p>
          <Button
            onClick={redirectToCustomerPortal}
            disabled={loading || isLoading}
            className='w-full xs:w-[300px]'>
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
