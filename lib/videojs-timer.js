/*! videojs-timer
 * Original version copyright (c) 2015 burakbostancioglu,rustylarner
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
  'use strict';

  var defaults = { option: true }, timer;

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  timer = function(options) {
    var player = this;
    player.on('timeupdate', time_updated);
    player.on('ended', time_updated);
    var position = -1;
    var last_position = -1;

    function time_updated(time_update_event){
      var current_time = player.currentTime();
      var duration = player.duration();
      var time;
      if (options.interval) {
        position = Math.floor(current_time / options.interval);
        var mod = Math.floor(current_time) % options.interval;
        if (mod) {
          position += 1;
        }
        if ((last_position == position) || (position <= 0)) {
          return;
        }
        last_position = position;
        time = position * options.interval;
      } else {
        time = current_time;
      }

      if(time > duration) {
        time = duration;
      }

      if(time_update_event.type === "ended") {
        time = duration;
      }

      parent.postMessage(options.event_name + " " + Math.floor(duration) + " " + time, '*');
    }
  };

  // register the plugin
  videojs.plugin('timer', timer);
})(window, window.videojs);
