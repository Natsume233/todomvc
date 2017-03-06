(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	/*为应用程序创建模块，管理页面结构*/
	var myApp = angular.module('app',['ngRoute','app.controllers.main']);
	/*路由配置*/
	myApp.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
			.when('/:status?',{
				controller: 'MainController',
				templateUrl: 'main_tmpl'
			})
			.otherwise({ redirectTo:'/' });
	}]);

})(angular);
