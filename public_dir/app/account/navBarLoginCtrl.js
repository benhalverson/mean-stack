angular.module("app").controller("navBarLoginCtrl", function($scope, $http){
	$scope.sigin = function(username, password) {
		console.log("Not signed in");
			$http.post("/login", {username: username, password: password}).then(function(response){
				if(response.data.success){
					console.log("logged in");
				} else {
					console.log("failed to log in!");
				}
			})
	}
});