angular.module('app')
.directive('gpTrackCards', ['trackListValue','audioService', function(trackListValue, audioService){
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
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    templateUrl: 'views/gp-track-cards.html',
    link: function($scope, iElm, iAttrs, controller) {
      var previousPlayIndex = -1;
      $scope.trackList = trackListValue;

      $scope.playPauseThisTrack = function($index) {
        
        var trackUrl = trackListValue[$index]['url'];
        if (previousPlayIndex !== $index) {
          //pause previous
          if (previousPlayIndex !== -1) {

            audioService.pause();
            trackListValue[previousPlayIndex].playing = !trackListValue[previousPlayIndex].playing;
           
            audioService.setUrl(trackUrl).play();
            trackListValue[$index].playing = !trackLDistValue[$index].playing;

          }else if(previousPlayIndex === -1){
            audioService.setUrl(trackUrl).play();
            trackListValue[$index].playing = !trackLDistValue[$index].playing;
            previousPlayIndex = $index;
          }

        }else if(previousPlayIndex === $index){
          trackListValue[$index].playing = !trackListValue[$index].playing;
          if (trackListValue[$index].playing) {
            //pause
            audioService.pause();
          }else{
            //play
            audioService.play();
          }

        }

      }
    }
  };
}]);

audioService.playUrl