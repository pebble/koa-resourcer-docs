'use strict';

var koa = require('koa');
var app = koa();
var router = require('koa-joi-router');
var r = router();

// Expose routes to docs generator
app.routes = r.routes;

r.get('/visible',
  {
    description: 'Overridden by superior papers.',
    meta: {
      description: 'Here are my commanding papers.'
    },
    validate: {
      describe: function() {
        return 'Papers';
      }
    }
  },
  function* () {
    this.body = 'Not a care in the world';
  }
);

r.get('/undefinedValidateProp',
  {
    meta: {
      description: 'Route with an undefined validate attribute'
    },
    validate: {
      body: undefined
    }
  },
  function* () {
    this.body = 'This should not throw an error!';
  }
);

r.get('/hidden',
  {
    meta: {
      description: "You don't know me",
      hide: true
    }
  },
  function* () {
    this.body = 'Potato';
  }
);

r.get('/hiddentoo',
  {
    hide: true,
    meta: {
      description: "You also don't know me"
    }
  },
  function* () {
    this.body = 'Mashed potato';
  }
);

app.use(r.middleware());

module.exports = app;
