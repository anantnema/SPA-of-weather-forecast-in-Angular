//Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource'])

//Routes
weatherApp.config(function($routeProvider){
	$routeProvider	
		.when('/',{
			templateUrl: 'home.html',
			controller: 'homeController'
		})
		.when('/forecast',{
			templateUrl: 'forecast.html',
			controller: 'forecastController'
		})
		.when('/forecast/:num',{
			templateUrl: 'forecast.html',
			controller: 'forecastController'
		})
});

//Services
weatherApp.service('cityService',function(){
	this.city = "New York, NY";
}); 

//Controllers
weatherApp.controller('homeController',['$scope','cityService', '$location',function($scope,cityService,$location){
	$scope.city= cityService.city;
	$scope.$watch('city',function(){
		cityService.city = $scope.city;
	});
	$scope.submit = function(){
		$location.path("/forecast");;
	};
	
}]);

weatherApp.controller('forecastController',['$scope','cityService','$resource','$routeParams',function($scope,cityService,$resource,$routeParams){
	$scope.city= cityService.city;
	 
	 $scope.days = $routeParams.num || '2';
	 
	
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"}, {get: {method:"JSONP"}});
	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, appid: '3acfcd8fab6e674baa61ce333d4c99cb' , cnt: $scope.days });
	
	
	$scope.convertToCelsius = function(degK){
		
		return Math.round(degK - 273);
	};
	
	$scope.convertToFahrenheit = function(degK){
		return ((1.8*(degK-273)) + 32);
	}

	$scope.convertToDate = function(dt){
		return new Date(dt*1000);
	};
	$scope.func = window.location.hash;
	
}]);

//Custom Directives

weatherApp.directive("weatherReport", function(){
	return {
		templateUrl: 'directive.html',
		replace: true,
		restrict: 'E',
		scope: {
			weatherDay: "=",
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
})

