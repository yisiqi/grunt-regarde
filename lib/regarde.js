'use strict';

//
// Observe files changes on disk as per the furnished configuration.
// The +watcherObject+ is an instance of a watcher class that have the same interface
// as Gaze. This is used only for driving easily the tests
//
var Regarde = module.exports = function (events, watcherObject) {
  this.watcher = watcherObject;
  this.events = events;

  if (! this.watcher) {
    var Gaze = require('gaze').Gaze;
    this.watcher = new Gaze('');
  }


  // watcher.on('changed', function (filepath) {
  //   grunt.event.emit('regarde:file:changed', filepath);
  // })
};

Regarde.prototype.add = function add(pattern, tasks, spawn) {
  var _this = this;

  this.watcher.add(pattern, function (err) {
    if (err) {
      // FIXME: Log error !
      return false;
    }
    this.on('all', function (status, filepath) {
      // Send out events !
      _this.events.emit('regarde:file:' + status, filepath, tasks, spawn);
    });
  });
};