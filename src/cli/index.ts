#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/* eslint-disable no-unused-expressions */
yargs(hideBin(process.argv))
  .commandDir('commands')
  .demandCommand()
  .strict()
  .help()
  .argv;
