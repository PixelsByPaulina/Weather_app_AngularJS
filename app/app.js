"use strict";

angular.module("weatherApp", [])
    .controller("weatherController", function($scope, $http) {
        // CITY SELECTION
        $scope.writtenCity = "";
        $scope.selectedCity = "Klaipėda";
        $scope.currentUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=55.7126&lon=-21.1352&lang=lt&units=metric&appid=48507c7efbe2a4ca1b59a199ea479b46";
        var url = "https://api.openweathermap.org/data/2.5/onecall?";
        var APIkey = "&lang=lt&units=metric&appid=48507c7efbe2a4ca1b59a199ea479b46";

        // CREATE API LINK WITH BY CITY NAME
        $scope.findCity = function() {
            // IF INPUT FIELD IS NOT EMPTY, ACCEPT THE VALUE
            if ($scope.writtenCity !== "") {
                $scope.selectedCity = $scope.writtenCity;


                // FUNCTION TO GET LAT&LON FROM OpenCageData - GEOCODING
                $scope.geocodingUrl = "";
                // URL turetu atrodyt taip:
                // https://api.opencagedata.com/geocode/v1/json?q=Vilnius&key=de0441ef4d1f4f5497beb31ef45bd50f
                $scope.getGeolocation = function() {
                    $http({
                        method: "GET",
                        url: $scope.geocodingUrl
                    })
                        .then(function (data, status) {
                            // CURRENT WEATHER
                            //$scope.cityName = data.data.city.name;
                            $scope.latData = data.data;
                            $scope.lonData = data.data;
                        })
                        .error(function (data, status) {
                            $scope.latData = "Error";
                        });
                };



                //$scope.currentUrl = url + "q=" + $scope.selectedCity + APIkey;

                $scope.getWeather();
            }
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
                    if(data.data.cod === "400") {
                        $scope.cityName = "Miestas nerastas";
                    }
                    else {
                        // CURRENT WEATHER
                        //$scope.cityName = data.data.city.name;
                        $scope.date = data.data.current.dt;
                        $scope.temperature = Math.round(data.data.current.temp);
                        $scope.feelsLike = Math.round(data.data.current.feels_like);
                        $scope.wind = data.data.current.wind_speed;
                        $scope.description = data.data.current.weather[0].description;
                        $scope.icon = "https://openweathermap.org/img/wn/" +
                            data.data.current.weather[0].icon +
                            ".png";

                        // FUTURE WEATHER
                        $scope.futureData = data.data.daily.slice(1, 6);
                        $scope.iconHttp = "https://openweathermap.org/img/wn/";
                        $scope.png = ".png";
                    }
                })
                .error(function (data, status) {
                    $scope.cityName = "Error";
                });
        };


        // TRIGGERS TO SHOW DEFAULT WEATHER ON PAGE LOAD
        $scope.init = function() {
            $scope.getWeather();
        };
    });