angular.module('ux.global', [])
.service('uxGlobal', function($location) {
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
  })
