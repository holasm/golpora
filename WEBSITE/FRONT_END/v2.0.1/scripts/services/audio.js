angular.module('app')

.service('audioService', 
  ['ngAudio',

  function(ngAudio){
    var self = this;

    self.playing = 0;
    // self.showPlayer = 0
    self.playUrl = '';
    // self.loading = 0;

    self.setUrl = function(trackUrl) {
      if (trackUrl) {
        if (self.playUrl !== trackUrl) {
          self.playUrl = trackUrl;
          self.audio = ngAudio.load(trackUrl);
          self.audio.volume = 0.8;
        }
        window.ad = self.audio;
      }

      return self;
    }

    self.play = function() {
      if (self.audio) {
        self.audio.play();
        self.playing = 1;
      }
    }//end play

    self.pause = function() {
      if (self.audio) {
        self.audio.pause();
        self.playing = 0;
      }
    }//end pause

  }//end function
]);