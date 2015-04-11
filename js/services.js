// js/services/todos.js
angular.module('demoServices', [])
        .factory('CommonData', function() {
        var data = "";
        return {
            getData : function(){
                return data;
            },
            setData : function(newData) {
                data = newData;                
            }
        }
    })
    .factory('Users', function($http, $window) {      
        return {
            get : function(params) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users?select=' + JSON.stringify(params));
            },
            getById : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/users?where={"_id":"' + id + '"}');
            },
            post : function(user) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.post(baseUrl+'/api/users', $.param(user));
            },
            delete : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.delete(baseUrl+'/api/users/' + id);
            },
            put : function(user) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.put(baseUrl+'/api/users/' + user._id, $.param(user));
            }
        }
    })
    .factory('Tasks', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/tasks');
            },
            getById : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/tasks?where={"_id":"' + id + '"}');
            },
            getByUserId : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/tasks?where={"assignedUser":"' + id + '"}');
            },
            post : function(task) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.post(baseUrl+'/api/tasks', $.param(task));
            },
            put : function(task) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.put(baseUrl+'/api/tasks/' + task._id, $.param(task));
            },
            delete : function(id) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.delete(baseUrl+'/api/tasks/' + id);
            }
        }
    })
    ;
