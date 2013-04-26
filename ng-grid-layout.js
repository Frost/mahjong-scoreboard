// ngGridLayoutPlugin = function() {
//     var self = this;
//     this.grid = null;
//     this.scope = null;
//     this.init = function(scope, grid, services) {
//         self.domUtilityService = services.DomUtilityService;
//         self.grid = grid;
//         self.scope = scope;
//     };
// 
//     this.updateGridLayout = function () {
//         self.scope.$apply(function(){
//             self.domUtilityService.RebuildGrid(self.scope, self.grid);
//         });
//     };
// }

ngGridLayoutPlugin = {
  self: this,
  grid: null,
  scope: null,
  init: function(scope, grid, services) {
        self.domUtilityService = services.DomUtilityService;
        self.grid = grid;
        self.scope = scope;
    },
  updateGridLayout: function () {
        self.scope.$apply(function(){
            self.domUtilityService.RebuildGrid(self.scope, self.grid);
        });
    }
}
