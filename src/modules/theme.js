angular.module('ux.themes', [])
.directive('uxThemable', function() {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        uxThemable: '@'
      },
      controller: function($element, $location, $scope) {
        function checkTheme() {
          var params = $location.search();
          var theme = ($scope.uxThemable && params[$scope.uxThemable]) || params.uxTheme;
          if (theme) {
            $element.addClass(theme);
          }
        }
        $scope.$on('$locationChangeSuccess', function() {
          checkTheme();
        });
        checkTheme();
      }
    };
  });
