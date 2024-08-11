import express, { Router } from 'express';
import beaconChainRoute from './beaconChain.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const routes: IRoute[] = [
  { path: '/beacon-chain', route: beaconChainRoute },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;