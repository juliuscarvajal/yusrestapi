/* jshint node: true */
/* jshint esnext: true */

import bunyan from 'bunyan';

// LOGGING
// =============================================================================
// watch logs in seperate terminal tail -f logs/output.log | bunyan -o short -L
// watch logs in stdout gulp serve | bunyan -o short -L
// check bunyan --help on CLI for more info
let log = bunyan.createLogger({
  name: "sb2",
  streams: [
    {
      stream: process.stdout,
      level: "debug"
    },
    /*
    {
      path: "logs/output.log",
      level: "debug",
      type: 'rotating-file',
      period: '1d',   // daily rotation
      count: 7
    }
    */
  ]
});

export {log};
