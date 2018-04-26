#!/usr/bin/env node
import startServer from './server';
import config from './loadConfig';

startServer(config);
