var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'gifting'
    },
    port: 3000,
    db: 'mongodb://localhost/gifting-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'gifting'
    },
    port: 3000,
    db: 'mongodb://localhost/gifting-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'gifting'
    },
    port: (process.env.PORT || 3000),
    db: process.env.MONGOLAB_URI
  }
};

module.exports = config[env];
