/**
 * Created by Administrator on 2017/2/15 0015.
 */
(function (angular) {
	'use strict';
	var controller = angular.module('app.controllers.main',['app.services.main']);
	controller.controller('MainController', ['$scope', '$location','$routeParams', '$route', 'MainService', function ($scope, $location,$routeParams, $route, MainService) {
		/*文本框模型*/
		$scope.text = '';
		/*任务列表*/
		$scope.todos = MainService.get();
		/*添加todo*/
		$scope.add = function () {
			if(!$scope.text) {
				return;
			}
			MainService.add($scope.text);
			/*随即清空文本框*/
			$scope.text = '';
		};
		/*删除*/
		$scope.remove = MainService.remove;
		/*清空已完成*/
		$scope.clear = function () {
			var newTodos = MainService.clearCompleted();
			$scope.todos = newTodos;
		};
		/*是否有已完成的*/
		$scope.existCompleted = MainService.existCompleted;
		/*当前编辑的元素,-1表示没有被编辑*/
		$scope.currentEditingId = -1;
		$scope.editing = function (id) {
			/*双击如果todo.id === currentEditingId则为编辑状态*/
			$scope.currentEditingId = id;
		};
		$scope.save = function () {
			$scope.currentEditingId = -1;
		};
		$scope.toggleAll = function () {
			MainService.toggleAll();
		};
		$scope.toggle = function () {
			MainService.save();
		};
		/*状态筛选*/
		$scope.selector = {};
		var status = $location.$$hash;
		// console.log($location.$$hash);
		switch (status) {
				case '/active':
					$scope.selector = { completed: false };
					break;
				case '/completed':
					$scope.selector = { completed: true };
					break;
				default:
					$route.updateParams({ status: '' });
					$scope.selector = {};
					break;
			}
		// var status = $routeParams.status;
		// console.log($route);
		// switch (status) {
		// 	case 'active':
		// 		$scope.selector = { completed: false };
		// 		break;
		// 	case 'completed':
		// 		$scope.selector = { completed: true };
		// 		break;
		// 	default:
		// 		$route.updateParams({ status: '' });
		// 		$scope.selector = {};
		// 		break;
		// }
		/*自定义比较函数，默认filter过滤器使用的是模糊查询*/
		$scope.equalCompare = function (source, target) {
			return source === target;
		}
	}])
})(angular);
