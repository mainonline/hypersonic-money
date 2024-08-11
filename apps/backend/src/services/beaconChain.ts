import { BeaconNodeClient } from './beaconNodeClient';
import prisma from '../client';
import { Slot } from './slot';
import { EventSource, MessageEvent } from 'event-source-polyfill';
import config from '../config/config';

const beaconNode = new BeaconNodeClient();

export async function syncBeaconChain() {
  const latestSlot = await beaconNode.getLatestSlot();
  for (let slot = 0; slot <= latestSlot; slot++) {
    const state = await beaconNode.getStateBySlot(slot);
    await prisma.beaconState.create({
      data: {
        slot: BigInt(slot),
        state_root: state.stateRoot,
      },
    });
  }
}


async function* streamSlots(slotToFollow: Slot): AsyncGenerator<Slot> {
  const url = new URL(`${config.beaconUrl}/eth/v1/events/?topics=head`);
  const eventSource = new EventSource(url.toString());

  const asyncIterator = {
    [Symbol.asyncIterator]() {
      return {
        next: () => new Promise<{ value: MessageEvent; done: boolean }>((resolve) => {
          eventSource.addEventListener('message', (event: MessageEvent) => {
            resolve({ value: event, done: false });
          });
          eventSource.addEventListener('error', () => {
            resolve({ value: new MessageEvent('error'), done: true });
          });
        }),
      };
    },
  };

  return async function* () {
    let lastSlot = slotToFollow;

    for await (const event of asyncIterator) {
      if (event.type === 'message') {
        const data = JSON.parse(event.data);
        if (data.event === 'head') {
          const head = data.data as { slot: string; block: string; state: string };

          // Detect forward gaps in received slots, and fill them in.
          if (Slot.fromString(head.slot) > lastSlot && Slot.fromString(head.slot) !== lastSlot.add(1)) {
            for (let missingSlot = lastSlot.add(1); missingSlot.lessThan(Slot.fromString(head.slot)); missingSlot = missingSlot.add(1)) {
              console.debug(`Adding missing slot ${missingSlot.toString()} to slots stream`);
              yield missingSlot;
            }
          }

          lastSlot = Slot.fromString(head.slot);
          yield lastSlot;
        }
      }
    }
  }();
}