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
  channels: {
    router: function(next) {
      this.model = 'channels';
      log.info('API:', this.model)
      let r = new koarouter();
      r.get('/', this.findAll);
      r.get('/:id', this.findById);

      let related = models.channels.relatedRouter();
      r.use('/:id', related);

      return r.routes();
    },

    findAll: function*(next) {
      this.body = 'channels base';
    },

    findById: function*(next) {
      this.body = 'channels id = ' + this.params.id;
    },

    relatedRouter: function(next) {
      let related = 'schedules';
      let r = new koarouter();
      let model = models[related];
      r.get('/', model.findAll);
      r.get('/:id', model.findById);
    }
  },
  schedules: {
    router: function(next) {
      this.model = 'schedules';
      log.info('API:', this.model)
      let r = new koarouter();
      r.get('/', this.findAll);
      r.get('/:id', this.findById);

      return r.routes();
    },

    findAll: function*(next) {
      this.body = 'schedules base';
    },

    findById: function*(next) {
      this.body = 'schedules id = ' + this.params.id;
    }
  },
  /*
  locations: {
    router: function(next) {
      let model = 'locations';
      let r = new koarouter();
      r.get('/', function*(next) {
        this.body = model + ' base';
      });
      r.get('/:id', function*(next) {
        this.body = model + ' id = ' + this.params.id;
      });

      return r.routes();
    }
  }
  */
};

//////////
_.map(models, (model, name) => {
  let router = model.router.bind(model);
  modelrouter.use('/' + name, router);
});
/////////////

apirouter.use(API_ENDPOINT, modelrouter.routes());
app.use(apirouter.routes());

app.listen(3000);
