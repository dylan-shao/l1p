(function(){
	'use strict';
	angular.module('app', [])
		.controller('MainCtrl', function($scope, $http, $rootScope){
			$scope.logout = function(){
				$http.delete('/api/login')
					.success(function(){
						$scope.user = undefined;
						$rootScope.$broadcast('logout');
					})
			};
			$scope.$on('login success', function(e, user){
				$scope.user = user;
			});
		})
		.controller('LoginCtrl', ['$scope', '$http', '$rootScope'
			, function($scope, $http, $rootScope){
			var self = this;
			$scope.$on('logout', function(){
				self.user = undefined;
			});
			$http.get('/api/login')
				.success(function(resp){
					if(resp.username){
						self.user = resp;
						$rootScope.$broadcast('login success', self.user);
					}
				});
			self.login = function(user){
				console.log("12username: "+user.username);
				$http.post('/api/login', user)
					.then(function(resp){
						console.log("123");
						if(resp.data.username){
							self.user = {username:resp.data.username};
							$rootScope.$broadcast('login success', self.user);
						} else {
							self.msg = resp.data.msg;
						}

					});
			}
		}])

		

		
})();