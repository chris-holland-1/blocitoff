(function() {
  function Task($firebaseArray) {
    //$firebaseObject
    //var Task = {};
    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);
    var selectedTasks = [];

    var createTask = function(newTask) {
      tasks.$add{name: newTask};
    };

    var getActiveTasks = function() {
      var activeTasks = [];
      var totalTasks = tasks.length;

      for (var i = 0; i < totalTasks; i++) {
        if (tasks[i].active) {
          activeTasks.push(tasks[i]);
        }
      }
    };

    var getArchivedTasks = function() {
      var archivedTasks = [];
      var totalTasks = tasks.length;

      for (var i = 0; i < totalTasks; i++) {
        if (!tasks[i].active) {
          archivedTasks.push(tasks[i]);
          tasks[i]
        }
      }
    };

    var getCompletedTasks = function() {
      var completedTasks = [];
      var totalTasks = tasks.length;

      for (var i = 0; i < totalTasks; i++) {
        if (tasks[i].completed) {
          completedTasks.push(tasks[i]);
        }
      }
    };

    var getExpiredTasks = function() {
      var expiredTasks = [];
      var totalTasks = tasks.length;

      var todaysDateTime = new Date().getTime();
      var sevenDays = 60480000;

      for (var i = 0; i < totalTasks; i++) {
        if (tasks[i].created_at < (todaysDateTime - sevenDays)) {
          ref.chold(tasks[i].$id).update({expired: true, active: false});
          expiredTasks.push(tasks[i]);
        }
      }
    };

    //move tasks from active to archive
    var archiveTask = function() {
      for (var i = 0; i < selectedTasks.length; i++) {
        ref.child(selectedTasks[i].$id).update({active: true, expired: false, completed: false});
      }
      selectedTasks = []
    };

    //move tasks from archive to active
    var reactivateTask = function() {
      for (var i = 0; i < selectedTasks.length; i++) {
        ref.child(selectedTasks[i].$id).update({active: true, expired: false, completed: false});
      }
      selectedTasks = [];
    };

    //removes tasks
    var removeTask = function() {
      for (var i = 0; i < selectedTasks.length; i++) {
        ref.child(selectedTasks[i].$id).remove();
      }
      selectedTasks = [];
    };

    //add one task at ta time
    var addTask = function() {
      tasks.$add({
        name: taskName,
        active: true,
        created_at: Firebase.ServerValue.TIMESTAMP,
        completed: false,
        expired: false
      });
    };

    //select task
    var selectTask = function(task) {
      if (task.selected) {
        selectedTasks.push(task);
      } else {
        selectedTasks.splice(selectedTasks.indexOf(task), 1);
      }
    };

    //task complete
    var completeTask = function() {
      for (var i = 0; i < selectedTasks.length; i++) {
        ref.child(selectedTasks[i].$id).update({completed: true, active: false});
      }
      selectedTasks = [];
    };

    return {
      all: tasks,
      createTask: createTask,
      getActiveTasks: activeTasks,
      getArchivedTasks: archivedTasks,
      getCompletedTasks: completedTasks,
      getExpiredTasks: expiredTasks
    };
  }

  angular
    .module('blocitoff')
    .factory('Task', ['$firebaseArray', Task]);
})();
