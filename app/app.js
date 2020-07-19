angular.module("weatherApp", [])
    .controller("weatherController", function($scope) {
        $scope.writtenCity;

        $scope.findCity = function() {
            $scope.selectedCity = $scope.writtenCity;
        };

        $scope.findAutomatic = function() {
            $scope.selectedCity = "Radau";
        };




    });