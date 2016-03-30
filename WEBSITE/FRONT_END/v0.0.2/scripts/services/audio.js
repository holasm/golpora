angular.module('app')

.service('audioService', 
  ['ngAudio','audioUrlList','$rootScope',

  function(ngAudio, audioUrlList, $rootScope){
    var self = this;

    self.playing = 0;
    // self.showPlayer = 0
    self.playUrl = '';
    // self.loading = 0;

    self.setUrl = function(trackUrl) {
      if (trackUrl) {
        if (self.playUrl !== trackUrl) {

          /*
          | save previous audio if exists
          */
          if (self.audio) {
            //save audio
            self.audio.setCurrentTime(0);
            self.pause(self.playUrl);
            audioUrlList[self.playUrl] = self.audio;
          }

          //current url to preocess
          self.playUrl = trackUrl;

          //if audio object exists load from STORED List
          if (!audioUrlList[self.playUrl]) {
            self.audio = ngAudio.load(trackUrl);
          }else{
            self.audio = audioUrlList[self.playUrl];
          }

          // self.audio.volume = 0.8;
        }
        window.ad = self.audio;
      }

      return self;
    }

    self.play = function(url) {
      if (self.audio) {
        self.audio.play();
        self.playing = 1;
      }
      
      //broadcast event      
      if (url) { 
        $rootScope.$broadcast('audio:play', {url: url});
      }else{
        $rootScope.$broadcast('audio:play', {url: self.playUrl});
      }

    }//end play

    self.pause = function(url) {
      if (self.audio) {
        self.audio.pause();
        self.playing = 0;
      }

      //broadcast event
      if (url) {
        $rootScope.$broadcast('audio:paused', {url: url}); 
      }else{
        $rootScope.$broadcast('audio:paused', {url: self.playUrl});
      }

    }//end pause

  }//end function
]);