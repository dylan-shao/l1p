(function(){
	'use strict';
	angular.module('app', [])
		.controller('LoginCtrl', ['$scope', '$http', function(scope, $http){
			var self = this;
			$http.get('/api/login')
				.success(function(resp){
					if(resp.username){
						self.user = resp;
					}
				});
			self.login = function(user){
				$http.post('/api/login', user)
					.then(function(resp){
						if(resp.data.username){
							self.user = resp.data;
						} else {
							self.msg = resp.data.msg;
						}

					});
			}
			self.logout = function(){
				$http.delete('/api/login')
					.success(function(){
						self.user = undefined;
					})
			}

		}])
})();