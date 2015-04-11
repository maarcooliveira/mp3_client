var demoControllers = angular.module('demoControllers', ['720kb.datepicker']);

demoControllers.controller('TaskController', ['$scope', 'Tasks', function($scope, Tasks) {
  $scope.tasks = "";
  $scope.sort = 'name';

  $('nav a').removeClass('selected');
  $('#nav-tasks').addClass('selected');

  Tasks.get().success(function(data) {
    $('#loading').css('display', 'none');
    $scope.tasks = data.data;
  })
  .error(function(data) {
    if (data === null)
      message = "Failed to load data from server";
    else
      message = data.message;
    $('#loading').css('display', 'none');
    $('#error').html(message);
    $('#success').css('display', 'none');
    $('#error').css('display', 'block');
  });

  $scope.delete = function(id) {
    Tasks.delete(id).success(function(data) {
      $('#success').html(data.message);
      $('#error').css('display', 'none');
      $('#success').css('display', 'block');
      $('#task-' + id).css('display', 'none');
    })
    .error(function(data) {
      if (data === null)
        message = "Failed to load data from server";
      else
        message = data.message;
      $('#loading').css('display', 'none');
      $('#error').html(message);
      $('#success').css('display', 'none');
      $('#error').css('display', 'block');
    });
  };

}]);


demoControllers.controller('TaskInfoController', ['$scope', '$routeParams', 'Tasks', function($scope, $routeParams, Tasks) {
  $scope.task = "";

  $('nav a').removeClass('selected');
  $('#nav-tasks').addClass('selected');
  $('#data').css('display', 'none');

  $scope.id = $routeParams.id;

  Tasks.getById($scope.id).success(function(data) {
    $('#loading').css('display', 'none');
    $('#data').css('display', 'block');
    $scope.task = data.data[0];
  })
  .error(function(data) {
    if (data === null)
      message = "Failed to load data from server";
    else
      message = data.message;
    $('#loading').css('display', 'none');
    $('#error').html(message);
    $('#success').css('display', 'none');
    $('#error').css('display', 'block');
  });

}]);


demoControllers.controller('TaskEditController', ['$scope', '$routeParams', 'Tasks', 'Users', function($scope, $routeParams, Tasks, Users) {
  $scope.task = "";
  $scope.users = "";

  $(document).foundation();
  $('nav a').removeClass('selected');
  $('#nav-tasks').addClass('selected');
  $('#data').css('display', 'none');

  $scope.id = $routeParams.id;

  Tasks.getById($scope.id).success(function(data) {
    $scope.task = data.data[0];

    var params = {};

    Users.get(params).success(function(data) {
      $('#loading').css('display', 'none');
      $('#data').css('display', 'block');

      $scope.users = data.data;
    })
    .error(function(data) {
      if (data === null)
        message = "Failed to load data from server";
      else
        message = data.message;
      $('#loading').css('display', 'none');
      $('#error').html(message);
      $('#success').css('display', 'none');
      $('#error').css('display', 'block');
    });
  })
  .error(function(data) {
    if (data === null)
      message = "Failed to load data from server";
    else
      message = data.message;
    $('#loading').css('display', 'none');
    $('#error').html(message);
    $('#success').css('display', 'none');
    $('#error').css('display', 'block');
  });

  $('#form')
    .on('valid.fndtn.abide', function (e) {
      if(e.namespace != 'abide.fndtn') {
              return;
          }
      console.log('valid!');

      $scope.task.assignedUserName = $("#user-selected option:selected").text();

      Tasks.put($scope.task).success(function(data) {
        $('#success').html(data.message);
        $('#error').css('display', 'none');
        $('#success').css('display', 'block');
      })
      .error(function(data) {
        if (data === null)
          message = "Failed to load data from server";
        else
          message = data.message;
        $('#loading').css('display', 'none');
        $('#error').html(message);
        $('#success').css('display', 'none');
        $('#error').css('display', 'block');
      });
    });
}]);



demoControllers.controller('UserInfoController', ['$scope', '$routeParams', '$route', 'Users', 'Tasks', '$window', function($scope, $routeParams, $route, Users, Tasks, $window) {
  $scope.user = "";
  $scope.tasks = "";

  $('#completed-tasks').css('display', 'none');
  $('#data').css('display', 'none');

  $('nav a').removeClass('selected');
  $('#nav-users').addClass('selected');

  $('#show-button').on('click', function() {
    text = $(this).children()[0];
    icon = $(this).children()[1];
    if($(icon).hasClass('fa-eye')) {
      //display data
      $('#completed-tasks').css('display', 'block');
      $(icon).removeClass('fa-eye');
      $(icon).addClass('fa-eye-slash');
      $(text).text('hide');
    }
    else {
      //hide data
      $('#completed-tasks').css('display', 'none');
      $(icon).removeClass('fa-eye-slash');
      $(icon).addClass('fa-eye');
      $(text).text('show');
    }
  });

  $scope.markCompleted = function(task_id) {
    Tasks.getById(task_id).success(function(data) {
      var task = data.data[0];
      task.completed = true;
      Tasks.put(task).success(function(data) {
        $scope.user.pendingTasks.pop(task_id);
        Users.put($scope.user).success(function(data) {
          $route.reload();
        });
      }); 
    });
  }

  $scope.id = $routeParams.id;

  Users.getById($scope.id).success(function(data) {
    $scope.user = data.data[0];

    Tasks.getByUserId($scope.id).success(function(data) {
      $('#loading').css('display', 'none');
      $('#data').css('display', 'block');
      $scope.tasks = data.data;
    })
    .error(function(data) {
      if (data === null)
        message = "Failed to load data from server";
      else
        message = data.message;
      $('#loading').css('display', 'none');
      $('#error').html(message);
      $('#success').css('display', 'none');
      $('#error').css('display', 'block');
    });
  })
  .error(function(data) {
    if (data === null)
      message = "Failed to load data from server";
    else
      message = data.message;
    $('#loading').css('display', 'none');
    $('#error').html(message);
    $('#success').css('display', 'none');
    $('#error').css('display', 'block');
  });
}]);


demoControllers.controller('UserController', ['$scope', '$http', 'Users', '$window' , function($scope, $http,  Users) {

  $('nav a').removeClass('selected');
  $('#nav-users').addClass('selected');

  var params = {"name":1, "email":1}

  Users.get(params).success(function(data) {
    $('#loading').css('display', 'none');
    $scope.users = data;
  })
  .error(function(data) {
    if (data === null)
      message = "Failed to load data from server";
    else
      message = data.message;
    $('#loading').css('display', 'none');
    $('#error').html(message);
    $('#success').css('display', 'none');
    $('#error').css('display', 'block');
  });

  $scope.delete = function(id) {
    Users.delete(id).success(function(data) {
      $('#success').html(data.message);
      $('#error').css('display', 'none');
      $('#success').css('display', 'block');
      $('#user-' + id).css('display', 'none');
    })
    .error(function(data) {
      if (data === null)
        message = "Failed to load data from server";
      else
        message = data.message;
      $('#loading').css('display', 'none');
      $('#error').html(message);
      $('#success').css('display', 'none');
      $('#error').css('display', 'block');
    });
  };
}]);


demoControllers.controller('UserNewController', ['$scope', '$http', 'Users' , function($scope, $http,  Users) {
  $scope.user = null;
  $(document).foundation();
  $('nav a').removeClass('selected');
  $('#nav-users').addClass('selected');

  $('#form')
    .on('valid.fndtn.abide', function (e) {
      if(e.namespace != 'abide.fndtn') {
              return;
          }
      console.log('valid!');

      Users.post($scope.user).success(function(data) {
        $('#loading').css('display', 'none');
        $('#success').html(data.message);
        $('#error').css('display', 'none');
        $('#success').css('display', 'block');
      })
      .error(function(data) {
        if (data === null)
          message = "Failed to connect with server";
        else
          message = data.message;
        $('#loading').css('display', 'none');
        $('#error').html(message);
        $('#success').css('display', 'none');
        $('#error').css('display', 'block');
      });
    });
}]);


demoControllers.controller('TaskNewController', ['$scope', '$http', 'Tasks', 'Users' , function($scope, $http,  Tasks, Users) {
  $scope.task = null;
  $scope.users = null;

  $(document).foundation();
  $('nav a').removeClass('selected');
  $('#nav-tasks').addClass('selected');

  var params = {};

  Users.get(params).success(function(data) {
    $('#loading').css('display', 'none');
    $('#data').css('display', 'block');

    $scope.users = data.data;
  })
  .error(function(data) {
    if (data === null)
      message = "Failed to load data from server";
    else
      message = data.message;
    $('#loading').css('display', 'none');
    $('#error').html(message);
    $('#success').css('display', 'none');
    $('#error').css('display', 'block');
  });


  $('#form')
    .on('valid.fndtn.abide', function (e) {
      if(e.namespace != 'abide.fndtn') {
              return;
          }
      console.log('valid!');

      $scope.task.assignedUserName = $("#user-selected option:selected").text();

      Tasks.post($scope.task).success(function(data) {
        $('#loading').css('display', 'none');
        $('#success').html(data.message);
        $('#error').css('display', 'none');
        $('#success').css('display', 'block');
      })
      .error(function(data) {
        if (data === null)
          message = "Failed to load data from server";
        else
          message = data.message;
        $('#loading').css('display', 'none');
        $('#error').html(message);
        $('#success').css('display', 'none');
        $('#error').css('display', 'block');
      });
    });
}]);


demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $('nav a').removeClass('selected');
  $('#nav-settings').addClass('selected');

  $scope.setUrl = function() {
    $window.sessionStorage.baseurl = $scope.url; 
    $('#success').html('URL set');
    $('#error').css('display', 'none');
    $('#success').css('display', 'block');
  };

}]);


