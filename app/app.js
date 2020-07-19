angular.module("weatherApp", [])
    .controller("weatherController", ["$scope", function($scope) {
        var cityName = this;


        var writtenName = "";
        var selectedCity = "";

        cityName.findCity = function() {
            selectedCity = writtenName;
        };

        cityName.findAutomatic = function() {
            selectedCity = "Radau";
        };



    }]);