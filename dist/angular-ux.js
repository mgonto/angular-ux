(function() {


// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Modules
angular.module('ux',
    [
      'ux.pages',
      'ux.themes'
    ]);

angular.module('ux.global', [])
.service('uxGlobal', ["$location", function($location) {
    this.pages = [];
    this.currentPage = null;

    this.registerPage = function(name, home) {
      this.pages.push(name);
      if (home || $location.search().page == name) {
        this.changePage(name, !$location.search().page);
      }
    };

    this.changePage = function(name, changeUrl) {
      if (this.pages.indexOf(name) < 0) {
        throw new Error("The page you want to go to doesn't exist");
      }
      if (changeUrl) {
        var params = $location.search();
        params.page = name;
        $location.search(params);
      }
      this.currentPage = name;
    };
  }])

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
      controller: ["uxGlobal", "$attrs", "$scope", function(uxGlobal, $attrs, $scope) {
        uxGlobal.registerPage($scope.name, typeof $attrs.home !== 'undefined');

        $scope.getCurrentPage = function() {
          return uxGlobal.currentPage;
        }
      }]
    };
  })
  .directive('uxGo', function() {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        uxGo: '@'
      },
      controller: ["uxGlobal", "$attrs", "$element", "$scope", function(uxGlobal, $attrs, $element, $scope) {
        $element.on('click', function(e) {
          e.preventDefault();

          $scope.$apply(function() {
            uxGlobal.changePage($scope.uxGo, true);
          })
        });
      }]
    };
  });

angular.module('ux.themes', [])
.directive('uxThemable', function() {
    return {
      restrict: 'A',
      replace: false,
      controller: ["$element", "$location", "$scope", function($element, $location, $scope) {
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
      }]
    };
  });

}());