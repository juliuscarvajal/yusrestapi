/* jshint node: true */
/* jshint esnext: true */
/* jshint noyield: true */
"use strict";

import _ from 'lodash';
import koa from 'koa';
import koarouter from 'koa-router';

import {log} from './logger';
import {routes} from './routes';

const API_ENDPOINT = '/api/v0';

let app = koa();

let apirouter = new koarouter();
let modelrouter = new koarouter();

let models = {
  channels: {},
  schedules: {},
  locations: {}
};

//////////
modelrouter.get('/', function*(next) {
  log.info('modelrouter...');
  this.body = 'modelrouter';
});
/////////////

apirouter.use(API_ENDPOINT, modelrouter.routes());
app.use(apirouter.routes());

app.listen(3000);
