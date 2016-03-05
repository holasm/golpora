'use strict';
angular.module('app')
.directive('gpPlayer', 
[ '$window',
  'viewportValue',
  'urlValue',
  'audioService',
  '$timeout',
  function($window, viewportValue, urlValue, audioService, $timeout){
  // Runs during compile

    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        templateUrl: 'views/gp-player.html',
        link: function($scope, iElm, iAttrs, controller) {

          var el = {},
              maxProgressWidth = 0,
              setWidth = 0,
              loaded = 0;

          el.progressBarWrapper = iElm.find('.progress-bar-wrapper');
          el.progressBarBackground = iElm.find('.progress-bar-background');
          el.currentProgress = iElm.find('.current-progress');
          el.maxProgress = iElm.find('.max-progress');
          el.barHover = iElm.find('.bar-hover');
          el.progressBarOn = iElm.find('.progress-bar-on');
          el.progressBarOnHover = iElm.find('.progress-bar-on-hover');
          el.progressBarChange = iElm.find('.progress-bar-change');
          el.progressBarLoaded = iElm.find('.progress-bar-loaded');
          el.pointer = iElm.find('.pointer');
          el.play = iElm.find('div.play');
          el.pause = iElm.find('div.pause');
          el.next = iElm.find('div.next');

          
          $scope.progressInTime = '00:00';
          $scope.duration = '00:00';
          $scope.playing = 0;
          $scope.playable = 0;
          $scope.audio = {};
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
                el.progressBarLoaded.css({
                  width: $scope.playable +'px'
                });
                // console.log($scope.audio.audio.buffered.end(0));

              }

              if ($scope.playing ) {
                $scope.updateProgress();
              }

              //
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
          })

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


          //update the 
          $scope.updateProgress = function() {
            var progress = $scope.audio.progress;
              if (typeof(progress) === 'number') {
                var progressInPx = maxProgressWidth * progress;
                el.progressBarOn.css({
                  width:  progressInPx +'px'
                });
              }
          } 


          //initiallize
          var width = $window.innerWidth;
          var marginLeft = el.progressBarBackground.css('margin-left');

          setWidth = el.progressBarWrapper.width() - el.currentProgress.width() - el.maxProgress.width();
          el.progressBarBackground.css({
            width: setWidth +'px',
          });
          maxProgressWidth = el.barHover.width();

          var initialHeight = el.progressBarOnHover.height();
          el.barHover.bind('mouseover', function(e) {
            e.preventDefault();
            el.progressBarOnHover.css({
              'height': '5px'
            });
          });


          el.barHover.bind('mouseout', function(e){
            e.preventDefault();
            el.progressBarOnHover.css({
              'height': initialHeight+ 'px'
            });
 
            el.progressBarChange.width(0);
          });

          //
          el.barHover.bind('click', function(e){
            e.preventDefault();
            var mouseX = e.offsetX;

            //calculate % progress
            var progressInPercent = (mouseX / maxProgressWidth);

            //if audio exits and playable
            if (audioService.audio && audioService.audio.canPlay) {
              // var setCurrentTime = progressInPercent * audioService.audio.duration;//in seconds
              audioService.audio.setProgress(progressInPercent);
              $scope.seeked++;

              el.progressBarOn.css({
                  width: mouseX + 'px'
              });
            }

          });

          //
          el.barHover.bind('mousemove', function(e) {
            e.preventDefault();
            var mouseX = e.offsetX;
            el.progressBarChange.width(mouseX);
          });

          //
          el.pointer.bind('click', function(e){
            e.preventDefault();
            e.stopPropagation();
          });

          // el.pointer.bind('mouseover', function(e) {
          //   e.preventDefault();

          //   var mouseXPx = el.pointer.css('left');
          //   var progChangeWidth = mouseXPx.slice(0, (mouseXPx.length - 2));
          //   el.progressBarChange.css({
          //     width: progChangeWidth + 'px'
          //   });
          // });

          // el.pointer.bind('mouseout', function(e){
          //   e.preventDefault();
          //   el.progressBarChange.width(0);
          // });

          //response on window resize
          angular.element($window).bind('resize', function(){
            var width = $window.innerWidth;

            var marginLeft = el.progressBarBackground.css('margin-left');
            var setWidth = el.progressBarWrapper.width() - el.currentProgress.width() - el.maxProgress.width();
            maxProgressWidth = el.barHover.width();
            el.progressBarBackground.css({
              width: setWidth +'px',
            });
          });


          //Event listeners for player controls
          el.play.bind('click', function(e) {
            e.stopPropagation();
            if (audioService.playing) {
              audioService.pause();
            }else{
              audioService.setUrl(urlValue).play();
            }
          });

        }//end link
    };
}]);