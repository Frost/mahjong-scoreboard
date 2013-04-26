ngGridLayoutPlugin = {
  self: this,
  grid: null,
  scope: null,
  init: function(scope, grid, services) {
        this.domUtilityService = services.DomUtilityService;
        this.grid = grid;
        this.scope = scope;
    },
  updateGridLayout: function () {
        this.scope.$apply(function(){
            this.domUtilityService.RebuildGrid(this.scope, this.grid);
        });
    }
}
var app = angular.module('mahjong', ['ngGrid']);
app.controller('PlayerCtrl', function($scope) {
  $scope.players = [];
  $scope.numberOfPlayers = $scope.players.length;
  $scope.tablePointsTotal = 0;
  $scope.pointsTotal = 0;
  $scope.tables = 1;
  var gridLayout = ngGridLayoutPlugin;
  $scope.gridOptions = {data: 'players', plugins: [gridLayout]};

  $scope.addPlayer = function() {
    $scope.players.push({name: $scope.playerName, table: '?'});
    $scope.playerName = '';
    $scope.numberOfPlayers++;
    $scope.calculateTablePositions();
  };

  // Fyll alla bord till fyra spelare tills det är färre än tio kvar
  // 9: 3 + 3 + 3
  // 6: 3 + 3
  // 5: 3 + 3 (ta en från föregående bord, såvida inte det totalt är 5 spelare)
  // 2: 3     (plocka en spelare från föregående bord, eller spela inte)
  // 1: 3     (plocka en spelare de två föregående borden eller spela inte)
  $scope.calculateTablePositions = function() {
    var state = {
      player: 0,
      table: 1,
      players: $scope.players.length
    };

    // så länge det är minst 10 spelare kvar
    // sätt ut ett bord om fyra spelare
    while(state.players >= 10) {
      state = $scope.addTable(state, 4);
    }

    switch(state.players) {
      case 9: // 3 + 3 + 3
        state = $scope.addTables(state, [3,3,3]);
        break;
      case 8: // 4 + 4
        state = $scope.addTables(state, [4,4]);
        break;
      case 7: // 4 + 3
        state = $scope.addTables(state, [4,3]);
        break;
      case 6: // 3 + 3
        state = $scope.addTables(state, [3,3]);
        break;
      case 5: // XXX: Kommer bara inträffa när det är exakt fem spelare totalt
        console.assert($scope.players.length == 5);
        state = $scope.addTable(state, 5);
        break;
      case 4: // 4
        state = $scope.addTable(state, 4);
        break;
      case 3: // 3
        state = $scope.addTable(state, 3);
        break;
      case 2: // Kommer aldrig hända.
        break;
      case 1: // Kommer aldrig hända.
        break;
      default:
        // code
    }

    $scope.tables = state.table - 1;
  };

  $scope.addTables = function(state, seats) {
    for(var i = 0; i < seats.length; i++) {
      state = $scope.addTable(state, seats[i]);
    }

    return state;
  }

  $scope.addTable = function(state, seats) {
    for(var j = 0; j < seats; j++) {
      $scope.players[state.player].table = state.table;
      state.player++;
      state.players--;
    }
    state.table++;

    return state;
  }
});
