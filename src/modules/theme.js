angular.module('ux.themes', [])
.directive('uxThemable', function() {
    return {
      restrict: 'A',
      replace: false,
      controller: function($element, $location, $scope) {
        function checkTheme() {
          var params = $location.search();
          if (params.uxTheme) {
            $element.addClass(params.uxTheme);
          }
        }
        $scope.$on('$locationChangeSuccess', function() {
          checkTheme();
        });
        checkTheme();
      }
    };
  });
