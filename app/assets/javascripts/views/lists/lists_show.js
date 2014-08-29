Wunderclone.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],
  
  events: {
  },
  
  initialize: function(){
    this.tasks = this.model.tasks();
    this.activeTasks = this.model.activeTasks();
    this.completedTasks = this.model.completedTasks();
    
    this.listenTo(this.tasks, "add change remove sync", this.render);
    this.listenTo(this.model, "add change remove sync", this.render);
  },
  
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    
    this.$subSelector = $('#tasks');
    if (this._subViews){
      this.removeSubViews();
    }
    this.createSubViews();
    this.attachSubViews();
    
    
    return this;
  },
  
  removeSubViews: function(){
    this._subViews.forEach(function (subView){
      subView.remove();
    });
    
    this._subViews = [];
  },
  
  createSubViews: function(){
    var that = this;
    
    this._subViews = this._subViews || [];
    
    var newTaskView = new Wunderclone.Views.TasksNew({
      collection: that.tasks,
      model: this.model
    });
    this._subViews.push(newTaskView);
    
    this.tasks.forEach(function(task){
      var subView = new Wunderclone.Views.TasksShow({model: task});
      that._subViews.push(subView);
    });
  },
  
  attachSubViews: function(){
    var that = this;
    this._subViews.forEach(function(subView){
      that.$subSelector.append(subView.render().$el);
    });
  }
  
  
})