'use strict';
angular.module('app')
.directive('gpPlayer', 
[ '$window',
  'viewportValue',
  'audioService',
  'trackListValue',
   '$rootScope',
  function($window, viewportValue, audioService, trackListValue,  $rootScope){
  // Runs during compile

    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
         // restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        templateUrl: 'views/gp-player.html',
        link: function($scope, iElm, iAttrs, controller) {

          window.el = {};
          var    maxProgressWidth = 0,
              maxVolumeWidth = 0,
              setWidth = 0,
              loaded = 0;

          // el.progressBarWrapper = iElm.find('.progress-bar-wrapper');
          el.progressBarBackground = angular.element($('.progress-bar-background'));
          el.currentDuration = angular.element($('.current-duration'));
          el.volBarBackground = angular.element($('.vol-bar-background'));
          // el.barHover = iElm.find('controls');
          // el.progressBarOn = iElm.find('.progress-bar-on');
          el.loadedDuration = angular.element($('.loaded-duration'));
          // el.progressBarChange = iElm.find('.progress-bar-change');
          el.currentVolume = angular.element($('.current-volume'));
          // el.pointer = iElm.find('.pointer');
          el.changeDurationOnhover_1 = angular.element($('.progress-bar-background > div.change-duration-onhover-1'));
          el.changeDurationOnhover_2 = angular.element($('.progress-bar-background > div.change-duration-onhover-2'));
          el.progressPointer = angular.element($('.current-duration > .pointer'));
          el.play = angular.element($('div .play .icon-hover-boundary'));
          el.pause = angular.element($(".pause  .icon-hover-boundary"));
          el.next = angular.element(('div.next  .icon-hover-boundary'));

          el.changeVolOnhover_1 = angular.element($('.vol-bar-background > div.change-duration-onhover-1'));
          el.changeVolOnhover_2 = angular.element($('.vol-bar-background > div.change-duration-onhover-2'));
          el.volumePointer = angular.element($('.current-volume > .pointer')); 
          el.cardTitles = $('.card-title'); 

          el.trackImage = angular.element($('.track-info > .track-image')); 
          el.trackTitle = angular.element($('.track-details > .track-title')); 
          el.trackAuthor = angular.element($('.track-details > .track-author')); 

          $scope.progressInTime = '00:00';
          $scope.duration = '00:00';
          $scope.playing = 0;
          $scope.playable = 0;
          $scope.audio = {};
          $scope.progressHeight = 4;
          $scope.volumeBarHeight = 4;
          var durationInSeconds = 0;

          $scope.$watch(function() {

            if (audioService.audio) {
              if (audioService.audio !== $scope.audio) {
                $scope.audio = audioService.audio;
              }
              if ($scope.audio.canPlay) {

                //show how much of the audio part loaded
                $scope.playable = maxProgressWidth * 
                                  ($scope.audio.audio.seekable.end($scope.audio.audio.seekable.length - 1) / $scope.audio.duration);
                el.loadedDuration.css({
                  width: $scope.playable +'px'
                });
                // console.log($scope.audio.audio.buffered.end(0));

              }

              if ($scope.playing ) {
                $scope.updateProgress();
              }

              //update only when data changed in back
              if (durationInSeconds !== $scope.audio.duration) {

                durationInSeconds = $scope.audio.duration;
                if (!isNaN(durationInSeconds)) {
                  $scope.duration = formatTime($scope.audio.duration);
                }
              }

              //
              if (!isNaN($scope.audio.currentTime)) {
                $scope.progressInTime = formatTime($scope.audio.currentTime);
              }

              //connect playing state
              if($scope.playing !== audioService.playing){
                $scope.playing = audioService.playing;
              }

            }//if audio exists
          })//end $scope.$watch

          function formatTime(time) {
            var totalSeconds = Math.round(time);
            var hours = Math.floor(totalSeconds / (60*60));
            var minutes = Math.floor( (totalSeconds - hours * 60*60) / 60);
            var seconds = (totalSeconds - hours * 60*60) - (minutes * 60);
            
            if (hours < 10) {
              hours = '0' + hours;
            }

            if (minutes < 10) {
              minutes = '0' + minutes;
            }

            if ((seconds) < 10) {
              seconds = '0'+ seconds; 
            }

            if (hours === '00') {
              return (minutes +':'+ seconds);
            }else{
              return (hours +':'+ minutes +':'+ seconds);
            }

          }


          // //update the 
          $scope.updateProgress = function() {
            var progress = $scope.audio.progress;
              if (typeof(progress) === 'number') {
                var progressInPx = maxProgressWidth * progress;
                el.currentDuration.css({
                  width:  progressInPx +'px'
                });
              }
          } 


          // //initiallize
          // var width = $window.innerWidth;
          // var marginLeft = el.progressBarBackground.css('margin-left');

          // setWidth = el.progressBarWrapper.width() - el.currentProgress.width() - el.maxProgress.width();
          // el.progressBarBackground.css({
          //   width: setWidth +'px',
          // });

          maxProgressWidth = el.progressBarBackground.width();
          maxVolumeWidth = el.volBarBackground.width();

          // var initialHeight = el.progressBarOnHover.height();
          // el.barHover.bind('mouseover', function(e) {
          //   e.preventDefault();
          //   el.progressBarOnHover.css({
          //     'height': '5px'
          //   });
          // });


          // el.barHover.bind('mouseout', function(e){
          //   e.preventDefault();
          //   el.progressBarOnHover.css({
          //     'height': initialHeight+ 'px'
          //   });
 
          //   el.progressBarChange.width(0);
          // });

          /**
          / Presets
          /
          /
          */
          el.volumePointer.bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();
          });
          el.progressPointer.bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();
          });



          //called on mousemove
          //show track change hint
          $scope.showTrackChangeHint = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.progressHeight = 5;
            var progressInPx = $event.offsetX;
            if (el.currentDuration.width() < progressInPx) {
              el.changeDurationOnhover_1.width(0);
              el.changeDurationOnhover_2.width(progressInPx);
            }else{
              if (progressInPx > (el.currentDuration.width() - el.progressPointer.width()/2)) {
                el.changeDurationOnhover_1.width(progressInPx - el.progressPointer.width()/2);
              }else{
                el.changeDurationOnhover_1.width(progressInPx);
              }
              el.changeDurationOnhover_2.width(0);
              el.changeDurationOnhover_1.css({
                'background': '#12DA90'
              });
              el.currentDuration.css({
                'background': 'rgba(57, 222, 161, 0.72)'
              });
            }

          }

          //show track change hint
          $scope.hideTrackChangeHint = function () {
            $scope.progressHeight = 4;
            el.changeDurationOnhover_2.width(0);
            el.changeDurationOnhover_1.width(0);
          }

                    //
          $scope.changeCurTrackDuration = function(e){
            e.preventDefault();
            var mouseX = e.offsetX;

            //calculate % progress
            var progressInPercent = (mouseX / maxProgressWidth);

            //if audio exits and playable
            if (audioService.audio && audioService.audio.canPlay) {
              // var setCurrentTime = progressInPercent * audioService.audio.duration;//in seconds
              audioService.audio.setProgress(progressInPercent);
              $scope.seeked++;

              el.changeDurationOnhover_1.width(0);
              el.currentDuration.width(mouseX);
            };
          }



          //called on mousemove
          //show track change hint
          $scope.showVolChangeHint = function ($event) {
            $scope.volumeBarHeight = 5;

            var progressInPx = $event.offsetX;
            if (el.currentVolume.width() < progressInPx) {
              el.changeVolOnhover_1.width(0);
              el.changeVolOnhover_2.width(progressInPx);
            }else{
              if (progressInPx > (el.currentVolume.width() - el.volumePointer.width()/2)) {
                el.changeVolOnhover_1.width(progressInPx - el.volumePointer.width()/2);
              }else{
                el.changeVolOnhover_1.width(progressInPx);
              }

              el.changeVolOnhover_2.width(0);
              el.changeVolOnhover_1.css({
                'background': '#12DA90'
              });
              el.currentVolume.css({
                'background': 'rgba(57, 222, 161, 0.72)'
              });
            }
          }

          //show track change hint
          $scope.hideVolChangeHint = function () {
            $scope.volumeBarHeight = 4;
            el.changeVolOnhover_1.width(0);
            el.changeVolOnhover_2.width(0);
          }

          $scope.changeVolume = function(e) {
            e.preventDefault();
            var mouseX = e.offsetX;

            //calculate % progress
            var volumeInPercent = (mouseX / maxVolumeWidth);

            //if audio exits and playable
            if (audioService.audio) {
              // var setCurrentTime = progressInPercent * audioService.audio.duration;//in seconds
              audioService.audio.setVolume(volumeInPercent);
              // $scope.seeked++;

              el.currentVolume.width(mouseX);
              //reset vol change hint width
              el.changeVolOnhover_1.width(0);
            }; 
          }

          //

          // // el.pointer.bind('mouseover', function(e) {
          // //   e.preventDefault();

          // //   var mouseXPx = el.pointer.css('left');
          // //   var progChangeWidth = mouseXPx.slice(0, (mouseXPx.length - 2));
          // //   el.progressBarChange.css({
          // //     width: progChangeWidth + 'px'
          // //   });
          // // });

          // // el.pointer.bind('mouseout', function(e){
          // //   e.preventDefault();
          // //   el.progressBarChange.width(0);
          // // });

          // //response on window resize
          // angular.element($window).bind('resize', function(){
          //   var width = $window.innerWidth;

          //   var marginLeft = el.progressBarBackground.css('margin-left');
          //   var setWidth = el.progressBarWrapper.width() - el.currentProgress.width() - el.maxProgress.width();
          //   maxProgressWidth = el.barHover.width();
          //   el.progressBarBackground.css({
          //     width: setWidth +'px',
          //   });
          // });


          // //Event listeners for player controls
          $scope.playPause =  function() {
            if (audioService.playing) {
              audioService.pause();
            }else{
              audioService.play();
            }
          };

          //update track info
          $rootScope.$on('audio:play', function(event , data) {
            angular.forEach(trackListValue, function(val, index) {

              if (val.url == data.url) {
                
                //update image
                if (val.img) {
                  el.trackImage.css({
                    'background': 'url('+ val.img +') center / cover'
                  });
                }else{
                  el.trackImage.css({
                    'background': 'gray'
                  });
                }

                //update track title
                if (val.title) {
                  el.trackTitle.text(val.title);
                }else{
                  el.trackTitle.text('````````````````');
                }

              }


            });//end forEach
          });

          $scope.renderTracks = function() {
              angular.forEach(trackListValue, function(val, index) {
                if (val.img) {
                  angular.element(el.cardTitles[index]).css({
                    'background': 'url('+ val.img +') center / cover'
                  });
                }
              });
          }//end renderTracks

          $scope.renderTracks();

        }//end link
    };
}]);