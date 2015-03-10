angular.module("app").controller("mainCtrl", function($scope){
	$scope.courses = [
		{name: "Name of course", featured: true, published: new Date('3/10/2015')},
		{name: "Video editing", featured: false, published: new Date('1/1/2015')},
		{name: "Javascript 101", featured: true, published: new Date('3/13/2015')}
	]


});