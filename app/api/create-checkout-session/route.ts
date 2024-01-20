import { getUrl } from '@/lib/helpers';
import { stripe } from '@/lib/stripe';
import { getCustomer } from '@/lib/supabaseAdmin';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { price, quantity = 1, metadata = {} } = await req.json();

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

    console.log(getUrl());

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7,
        metadata,
      },
      success_url: `${getUrl()}/account`,
      cancel_url: `${getUrl()}/`,
    });

    if (!session) {
      throw new Error('Unfortunately session could not be created.');
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ' + error.message);
    }
    return new NextResponse('Error in stripe checkout session', {
      status: 500,
    });
  }
};
