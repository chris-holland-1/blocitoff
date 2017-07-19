(function() {
    function HomeCtrl() {
      $scope.title = "All Tasks";
      $scope.tasks = Tasks.getAllTasks();

      //switch views
      $rootScope.$watch("currentTaskType", function(type) {
        if (type !== undefined) {
          $scope.setTasks(type);
        }
      });

      //set tasks in view
      $scope.setTasks = function(type) {
        if(type === "all") {
          $scope.tasks = Tasks.getAllTasks();
          $scope.title = "All Tasks";
        } else if (type === "archived") {
          $scope.tasks = Tasks.getArchivedTasks();
          $scope.title =  "Archived Tasks";
        } else if (type === "completed") {
          $scope.tasks = Tasks.getCompletedTasks();
          $scope.title = "Completed Tasks";
        } else {
          $scope.tasks = Tasks.getExpiredTasks();
          $scope.title = "Expired Tasks";
        }
      };

      //set task
      $scope.setTasks = function(type) {
        $rootScope.currentTaskType = type;
      };

      //add task
      $scope.addTask = function() {
        Tasks.addTask($scope.newTaskName);
      };

      //remove task
      $scope.removeTask = function(task) {
        Tasks.removeTask(task);
      };

      //select task
      $scope.selectTask = function(task) {
        Tasks.selectTask(task);
      };

      //archive task
      $scope.archiveTask = function(task) {
        Tasks.archiveTask(task);
      };

      //expire task
      $scope.expireTask = function(task) {
        Tasks.expireTask(task);
      };

      //reactivate task
      $scope.reactivateTask = function(task) {
        Task.reactivateTask(task);
      };

      //mark task complete
      $scope.taskComplete = function(task) {
        Task.taskComplete(task);
      };

      //updates hoverEdit upon hover
      $scope.hoverIn = function() {
        this.hoverEdit = true;
      };

      $scope.hoverOut = function() {
        this.hoverEdit = false;
      };

    }

    angular
        .module('blocitoff')
        .controller('HomeCtrl', ['Task', HomeCtrl]);
})();
