"use strict";

angular.module("weatherApp", [])
    .controller("weatherController", function($scope, $http) {
        // CITY SELECTION
        $scope.writtenCity = "";
        $scope.selectedCity = "Vilnius";
        $scope.currentUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Kaunas&appid=61831ea54b831b0ea5482f37d73f171d";

        var url = "https://api.openweathermap.org/data/2.5/forecast?";
        var APIkey = "&appid=61831ea54b831b0ea5482f37d73f171d";

        // CREATE API LINK WITH BY CITY NAME
        $scope.findCity = function() {
            // IF INPUT FIELD IS NOT EMPTY, ACCEPT THE VALUE
            if ($scope.writtenCity !== "") {
                $scope.selectedCity = "q=" + $scope.writtenCity;
                $scope.currentUrl = url + $scope.selectedCity + APIkey;
            }
            $scope.getWeather();
        };

        // CREATE API LINK WITH GEOLOCATION
        $scope.findAutomatic = function() {
            $scope.selectedCity = "insert-Geolocation-info";
            // lat=54.6892&lon=25.2798 <--toks formatas reikalingas
            $scope.currentUrl = url + $scope.selectedCity + APIkey;
            $scope.getWeather();
        };


        $scope.getWeather = function() {
            $http({
                method: "GET",
                url: $scope.currentUrl
            })
                .then(function (data, status) {
                    if(data.data.cod !== "200") {
                        $scope.temperature = "Miestas nerastas";
                    }
                    else {
                        $scope.temperature = data.data;
                    }
                })
                .error(function (data, status) {
                    $scope.temperature = "Error";
                });
        };





        // WEATHER BY CITY NAME
        // https://api.openweathermap.org/data/2.5/forecast?q=Vilnius&appid=61831ea54b831b0ea5482f37d73f171d
        // WEATHER BY COORDINATES
        // https://api.openweathermap.org/data/2.5/forecast?lat=54.6892&lon=25.2798&appid=61831ea54b831b0ea5482f37d73f171d
    });