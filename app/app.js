"use strict";

angular.module("weatherApp", [])
    .controller("weatherController", function($scope) {
        // CITY SELECTION
        $scope.writtenCity = "";
        $scope.selectedCity = "";

        var url = "https://api.openweathermap.org/data/2.5/forecast?";
        var appId = "&appid=61831ea54b831b0ea5482f37d73f171d";

        $scope.findCity = function() {
            $scope.selectedCity = "q=" + $scope.writtenCity;
            $scope.currentUrl = url + $scope.selectedCity + appId;
        };

        $scope.findAutomatic = function() {
            $scope.selectedCity = "Radau";
            $scope.currentUrl = url + $scope.selectedCity + appId;
        };



        //$scope.currentUrl = url + $scope.selectedCity + appId;


        // FINDING CURRENT WEATHER BY CITY NAME
        /*var getWeather = function(city) {
          var url = "https://api.openweathermap.org/data/2.5/forecast?";
            var cityName = "q=" + $scope.selectedCity;
            var cityCoord = "lat=54.6892&lon=25.2798";
            var appId = "&appid=61831ea54b831b0ea5482f37d73f171d";
        };

        $geolocation.getLocation = function(position) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                $http.json("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&\n" +
                    "exclude=minutely,hourly&appid=61831ea54b831b0ea5482f37d73f171d")
                    .success(function(data) {
                        $scope.weatherData = data;
                        console.log(data);

                    });
            };
        };*/




        // WEATHER BY CITY NAME
        // https://api.openweathermap.org/data/2.5/forecast?q=Vilnius&appid=61831ea54b831b0ea5482f37d73f171d
        // WEATHER BY COORDINATES
        // https://api.openweathermap.org/data/2.5/forecast?lat=54.6892&lon=25.2798&appid=61831ea54b831b0ea5482f37d73f171d
    });