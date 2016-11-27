var app = angular.module("Connection", []);
app.controller("ConnectionCtrl", function ($scope, $window){
	$scope.login = false;
	$scope.test = function() {
		var user = document.getElementById("username").value;
		var pass = document.getElementById("password").value;
		if (user == 'admin' && pass == 'admin') {
			$scope.login = true;
			//console.log('Login successful');
			//alert("correct");
			$scope.logged=true;
			$window.location.href = 'index.html';
			//$location.path("C:/Users/mehdi/Desktop/oit/PISIRT/PISIRT/PI'SIRT/temperature.html");
		} else {
			if (user!='' && pass!=''){
			alert("Incorrect login or password, please enter valid parameters");}
		}
	}
});