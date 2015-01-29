;(function(){
  'use strict';

  var strageTask;

  var now = function() {
    var date = new Date();
    var y, m, d, h, i, s;
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDay();
    h = date.getHours();
    i = date.getMinutes();
    s = date.getSeconds();
    return y+"-"+m+"-"+d+" "+h+":"+i+":"+s;
  }

  template.deleteTask = function(e, detail, sender) {
    strageTask = JSON.parse(localStorage.getItem("tasks"));
    strageTask.splice(sender.index, 1);
    localStorage.setItem("tasks", JSON.stringify(strageTask));
    template.tasks = strageTask;
  };

  template.addTask = function(e, detail, sender) {
    template.tasks.unshift(
      {
        done:      false,
        title:     "",
        modified: now()
      }
    );
    localStorage.setItem("tasks", JSON.stringify( template.tasks ));
  };

  template.saveTask = function(e, detail, sender) {
    strageTask = JSON.parse(localStorage.getItem("tasks"));
    strageTask[sender.index] = {
      done:      sender.task.done,
      title:     sender.task.title,
      modified: now()
    };
    template.tasks = strageTask;
    localStorage.setItem("tasks", JSON.stringify(template.tasks));
    alert("save!");
  };

  template.checkedDeleted = function(e, detail, sender) {
    if( confirm("are you sure?") ) {
      strageTask = [];
      for(var i = 0; i <= template.tasks.length - 1; i++){
        if( !template.tasks[i].done ) strageTask.push(template.tasks[i]);
      }
      localStorage.setItem("tasks", JSON.stringify(strageTask));
      template.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
  }

  window.onload = function() {
    if( (localStorage.getItem("tasks") === "") || !( JSON.parse(localStorage.getItem("tasks")) instanceof Array) ){
      localStorage.clear();
    }
    var template = document.querySelector("#template");
    strageTask = localStorage.getItem("tasks");
    template.tasks = strageTask == null ? [] : JSON.parse(strageTask);
  };

})();
