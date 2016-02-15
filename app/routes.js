/* jshint node: true */
/* jshint esnext: true */
/* jshint noyield: true */
import {log} from './logger';

let template = function(endpoint) {
  return {
    base: function*() {
      this.body = endpoint + ' api';
    },
    id: function*(id) {
      this.body = endpoint + ' id api';
    },
    related: function*(id, related) {
      yield routes[related].base;
    }
  };
};

let routes = {
  channels: template('channels'),
  locations: template('locations'),
  schedules: template('schedules')
};

export {routes};
