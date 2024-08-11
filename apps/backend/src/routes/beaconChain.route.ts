import express from 'express';
import { syncBeaconChainController } from '../controllers/beaconChain.controller';

const router = express.Router();

router.route('/sync').post(syncBeaconChainController);

export default router;