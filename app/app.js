"use strict";

angular.module("weatherApp", [])
    .controller("weatherController", function($scope, $http) {
        // CITY SELECTION
        $scope.writtenCity = "";
        $scope.selectedCity = "Klaipėda";
        $scope.currentUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Klaipėda&lang=lt&appid=48507c7efbe2a4ca1b59a199ea479b46";
        var url = "https://api.openweathermap.org/data/2.5/forecast?";
        var APIkey = "&lang=lt&appid=48507c7efbe2a4ca1b59a199ea479b46";

        // CREATE API LINK WITH BY CITY NAME
        $scope.findCity = function() {
            // IF INPUT FIELD IS NOT EMPTY, ACCEPT THE VALUE
            if ($scope.writtenCity !== "") {
                $scope.selectedCity = $scope.writtenCity;
                $scope.currentUrl = url + "q=" + $scope.selectedCity + APIkey;
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
                        $scope.cityName = "Miestas nerastas";
                    }
                    else {
                        // CURRENT WEATHER
                        $scope.cityName2 = $scope.selectedCity;
                        $scope.cityName = data.data.city.name;
                        $scope.date = data.data.list[0].dt;
                        $scope.temperature = Math.round(data.data.list[0].main.temp - 273.15);
                        $scope.feelsLike = Math.round(data.data.list[0].main.feels_like - 273.15);
                        $scope.wind = data.data.list[0].wind.speed;
                        $scope.description = data.data.list[0].weather[0].description;
                        $scope.icon = "https://openweathermap.org/img/wn/" +
                            data.data.list[0].weather[0].icon +
                            ".png";

                        // FUTURE WEATHER
                        $scope.futureDate = data.data.list[1].dt;
                        $scope.futureTemperature = Math.round(data.data.list[1].main.temp - 273.15);
                        $scope.futureWind = data.data.list[1].wind.speed;
                        $scope.futureIcon = "https://openweathermap.org/img/wn/" +
                            data.data.list[1].weather[0].icon +
                            ".png";
                    }
                })
                .error(function (data, status) {
                    $scope.temperature = "Error";
                });
        };

        // TRIGGERS TO SHOW DEFAULT WEATHER ON PAGE LOAD
        /*$scope.init = function() {
            $scope.getWeather();
        };*/





        // WEATHER BY CITY NAME
        // https://api.openweathermap.org/data/2.5/forecast?q=Vilnius&appid=61831ea54b831b0ea5482f37d73f171d
        // WEATHER BY COORDINATES
        // https://api.openweathermap.org/data/2.5/forecast?lat=54.6892&lon=25.2798&appid=61831ea54b831b0ea5482f37d73f171d
    });