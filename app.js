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





















/*var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController',
        })
		.when('/second', {
            templateUrl: 'second.html',
            controller: 'secondController',
        })
        .when('/second/:num', {
            templateUrl: 'second.html',
            controller: 'secondController',
        })
});

myApp.service('nameservice', function(){
	var self = this;
	this.name = 'John Doe';
	this.namelength = function(){
		
		return self.name.length;
	}
	
});

myApp.directive('searchResult',function(){
	return {
		template: '<a href="#" class="list-group-item"><h4 class="list-group-item-heading">{{personObject.name}}</h4><p class="list-group-item-text">{{ formattedAddressFunction({ bperson: personObject})}}</p><small><ng-transclude></ng-transclude></small></a>',
		restrict: 'AE',
		replace: true,
		scope: {
			personObject: "=",
			formattedAddressFunction: "&"
		},
		transclude: true
	}    
})

myApp.controller('mainController',
    ['$scope', '$log', '$location','nameservice', function ($scope, $log, $location,nameservice) {
		
		$scope.people = [{
			name:'Anant Nema',
			address: '555 Main St.',
			city: 'New York',
			state: 'NY',
			zip:'11111'
		},
		{
			name:'Anushka Kedia',
			address: '555 Main St.',
			city: 'New York',
			state: 'NY',
			zip:'11111'
		},
		{
			name:'Anant Nema',
			address: '555 Main St.',
			city: 'New York',
			state: 'NY',
			zip:'11111'
		},
		]
		
		$scope.formattedAddress = function(person){
			return person.address + ', ' + person.city + ', ' + person.state + ' ' + person.zip;
		};
		
		
    }])
    .controller('secondController', ['$scope','$routeParams','nameservice', function ($scope,$routeParams,nameservice) {
				
				

    }]);

	*/

// when i compile i can gain access to the html that defines the view for directives.

/*var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function ($routeProvider){
	
	$routeProvider
	
	.when('/',{
		templateUrl: 'main.html',
		controller: 'mainController'
	})
	
	.when('/second',{
		templateUrl: 'second.html',
		controller: 'secondController'
	})
	
});

myApp.controller('mainController',['$scope','$log','$location',function($scope,$log,$location){
	$scope.name = 'Main';
	
}])

   .controller('secondController', ['$scope','$log','$location', function($scope,$log,$location){
	$scope.name = 'Second';
}]);
*/
/*

myApp.controller('secondController', ['$scope','$log','$location', function ($scope, $log,$location) {
        $scope.name = 'second';
    }]);
*/
/*
var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function ($routeProvider){
	
	$routeProvider
	
	.when('/',{
		templateUrl: 'pages/main.html',
		controller: 'mainController',
	})
	
	.when('/second',{
		templateUrl: 'pages/second.html',
		controller: 'secondController',
	})
	
});

myApp.controller('mainController',['$scope','$log','$location',function($scope,$log,$location){
	
	
		$scope.name = 'Main';
	
}]);

myApp.controller('secondController', ['$scope','$log','$location', function ($scope, $log,$location) {
        $scope.name = 'second';
    }]);






*/

/* var rulesrequest = new XMLHttpRequest();
	rulesrequest.onreadystatechange = function(){
		$scope.apply(function(){
			if(rulesrequest.readyState == 4 && rulesrequest.status == 200){
				$scope.rules = JSON.parse(rulesrequest.responseText);
			}
		});
		
	}
	rulesrequest.open("GET","URL",true);
	rulesrequest.send();

//ng-model
//ng-class
//ng-repeat
//ng-show
//ng-hide
//ng-change
//ng-checked
//ng-cloak


*/

	
	
		/*$scope.handle = ''; //connects controller nd code with view
	$scope.lowercasehandle = function(){
		return $filter('lowercase')($scope.handle);	
	};
	
	$scope.characters  = 5;
	$scope.rules = [
		
		{rulesname: "Must be 5 characters"},
		{rulesname: "Must be unique"},
		{rulesname: "Must be cool!"},
		
		
	];
	
	console.log($scope.rules);
	
	*/
