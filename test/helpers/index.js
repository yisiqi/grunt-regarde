'use strict';
var events = require('events');
var path = require('path');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var util = require('util');

// top level exports
var helpers = module.exports;

// Removes, creates and cd into the specified directory. If the current working
// directory is the same as the specified one, then acts as a noop. Meant to be
// used once per mocha suite.
//
// - dir   - the directory path to create
//
// Example:
//
//     before(helpers.directory('.test'));
//
// Returns a function suitable to use with mocha's before/after hooks.
helpers.directory = function directory(dir) {
  return function directory(done) {
    process.chdir(path.join(__dirname, '..'));
    rimraf(dir, function (err) {
      if (err) { return done(err); }
      mkdirp(dir, function (err) {
        if (err) { return done(err); }
        process.chdir(dir);
        done();
      });
    });
  };
};

helpers.testWatcher = function () {

};

util.inherits(helpers.testWatcher, events.EventEmitter);

helpers.testWatcher.prototype.add = function add(pattern, cb) {
  cb.bind(this)();
};

// Simulate a file change
//
helpers.testWatcher.prototype.fileChange = function fileChange(file) {
  this.emit('changed', file);
  this.emit('all', 'changed', file);
};
