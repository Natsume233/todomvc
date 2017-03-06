/**
 * Created by Administrator on 2017/2/15 0015.
 */
(function (angular) {
	/*注册模块*/
	angular.module('app.services.main',[])
		.service('MainService',['$window',function ($window) {
			var storage = $window.localStorage;
			var todos = storage['my_todo_list'] ? JSON.parse(storage['my_todo_list']) : [];

			/*获取唯一id 随机数形式*/
			function getId() {
				var id = Math.random();
				for(var i = 0; i < todos.length; i++) {
					if(todos[i].id === id) {
						id = getId();
						break;
					}
				}
				return id;
			};
			/*保存操作后的结果*/
			this.save = function () {
				storage['my_todo_list'] = JSON.stringify(todos);
			};
			/*控制私有字段的访问权限*/
			this.get = function () {
				return todos;
			};
			/*业务逻辑*/
			/*添加todo*/
			this.add = function (text) {
				todos.push({
					id: getId(),
					text: text,
					completed: false
				});
				this.save();
			};
			/*删除*/
			this.remove = function (id) {
				for(var i = 0; i < todos.length; i++) {
					if(todos[i].id === id) {
						todos.splice(i,1);
						break;
					}
				}
				this.save();
			};
			/*清空已完成*/
			this.clearCompleted = function () {
				var result = [];
				for(var i = 0; i < todos.length; i++) {
					if(!todos[i].completed) {
						result.push(todos[i]);
					}
				}
				todos = result;
				this.save();
				return todos;
			};
			/*是否有已完成*/
			this.existCompleted = function () {
				for(var i = 0; i < todos.length; i++) {
					if(todos[i].completed) {
						return true;
					}
				}
				return false;
			};
			/*更新*/
			this.update = function (id, target) {
				this.save();
			};

			var now = true;
			this.toggleAll = function () {
				for(var i = 0; i < todos.length; i++) {
					todos[i].completed = now;
				}
				now = !now;
				this.save();
			}
		}]);
})(angular);
