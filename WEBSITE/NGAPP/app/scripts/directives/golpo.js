'use strict';

/**
 * @ngdoc directive
 * @name app.directive:golpo
 * @description
 * # golpo
 */
angular.module('app')
  .directive('golpo', function () {
    return {
      templateUrl: 'views/golpo.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        // element.text('this is the golpo directive');
      },
      
      controller: function($scope){
        
        $scope.golpoGulo = [
          {
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },{
            name: "ami k",
            author: "k jane"
          },
          

        ];
      }

    };
  });
