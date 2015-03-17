angular.module('ux.pages', ['ux.global'])
  .directive('uxPage', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div ng-show="getCurrentPage() == name" ng-transclude>' +
                '</div>',
      transclude: true,
      scope: {
        name: '@'
      },
      controller: function(uxGlobal, $attrs, $scope) {
        uxGlobal.registerPage($scope.name, typeof $attrs.home !== 'undefined');

        $scope.getCurrentPage = function() {
          return uxGlobal.currentPage;
        }
      }
    };
  })
  .directive('uxGo', function() {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        uxGo: '@'
      },
      controller: function(uxGlobal, $attrs, $element, $scope) {
        $element.on('click', function(e) {
          e.preventDefault();

          $scope.$apply(function() {
            uxGlobal.changePage($scope.uxGo);
          })
        });
      }
    };
  });
