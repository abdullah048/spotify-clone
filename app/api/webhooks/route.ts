import { stripe } from '@/lib/stripe';
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord,
} from '@/lib/supabaseAdmin';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature');

  const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  let event: Stripe.Event;

  try {
    if (!signature || !webHookSecret) {
      return;
    }
    event = stripe.webhooks.constructEvent(body, signature, webHookSecret);
  } catch (error: any) {
    console.log('Error: ' + error.message);
    return new NextResponse('Webhook error: ' + error.message, {
      status: 400,
    });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(event.data.object);
          break;

        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(event.data.object);
          break;

        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subscription = event.data.object;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.created'
          );
          break;

        case 'checkout.session.completed':
          const checkoutSession = event.data.object;
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await manageSubscriptionStatusChange(
              subscriptionId as string,
              checkoutSession.customer as string,
              true
            );
          }
          break;
        default:
          throw new Error('Unhandled relevant event.');
      }
    } catch (error: any) {
      console.log('Error: ' + error);
      return new NextResponse('Webhook error: ' + error?.message, {
        status: 400,
      });
    }
  }
  return NextResponse.json({ received: true }, { status: 200 });
};
