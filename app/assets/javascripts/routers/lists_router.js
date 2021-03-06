Wunderclone.Routers.Lists = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.lists = options.lists;
    this.tasks = options.tasks;
  },
  
  routes: {
    'lists/starred' : 'starredShow',
    'lists/today' : 'todayShow',
    'lists/:id' : 'listsShow'
  },
  
  todayShow: function(){
    Wunderclone.displayedList = Wunderclone.Models.todayList;
    var showView = new Wunderclone.Views.TodayShow({
      model: Wunderclone.Models.todayList
    });
    
    this._swapView(showView);
    Wunderclone.Views.tasksNew.changeList(Wunderclone.Models.inbox, {type: "today"})
  },
  
  starredShow: function(){
    Wunderclone.displayedList = Wunderclone.Models.starredList;
    var showView = new Wunderclone.Views.StarredShow({
      model: Wunderclone.Models.starredList
    });
    
    this._swapView(showView);
    Wunderclone.Views.tasksNew.changeList(Wunderclone.Models.inbox, {type: "starred"});
  },
  
  listsShow: function(id){
    var that = this;
    var list = this.lists.getOrFetch(id);
    Wunderclone.displayedList = list;
    var showView = new Wunderclone.Views.ListsShow({
      model: list
    });
    
    that._swapView(showView);
    Wunderclone.Views.tasksNew.changeList(list);
    showView.toggleCompleted();
  },
  
  _swapView: function(view){
    if (this._currentView && this._currentView.removeSubViews){
      this._currentView.removeSubViews();
    }
    this._currentView && this._currentView.remove();
    this._currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
  
  
});
