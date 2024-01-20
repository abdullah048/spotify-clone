import { getUrl } from '@/lib/helpers';
import { stripe } from '@/lib/stripe';
import { getCustomer } from '@/lib/supabaseAdmin';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const supabase = createRouteHandlerClient({
      cookies: cookies,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not found.');
    }
    const customer = await getCustomer({
      email: user?.email ?? '',
      uuid: user.id ?? '',
    });

    if (!customer) {
      throw new Error('Customer not found.');
    }

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: getUrl() + '/account',
    });

    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error in creating portal link' + error);
    }
    return new NextResponse('Error in creating portal link', { status: 500 });
  }
};
