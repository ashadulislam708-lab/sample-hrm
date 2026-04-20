/* eslint-disable no-console */
import 'reflect-metadata';
import { runSeeders } from './seed';

runSeeders()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[seed] failed:', err);
    process.exit(1);
  });
