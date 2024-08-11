import { Request, Response } from 'express';
import { syncBeaconChain } from '../services/beaconChain';

export const syncBeaconChainController = async (_req: Request, res: Response) => {
  try {
    await syncBeaconChain();
    res.status(200).json({ message: 'Beacon chain synchronization started' });
  } catch (error) {
    res.status(500).json({ message: 'Error synchronizing beacon chain', error });
  }
};