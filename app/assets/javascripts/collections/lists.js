Wunderclone.Collections.Lists = Backbone.Collection.extend({

  model: Wunderclone.Models.List,
  url: "/api/lists",
  
  getOrFetch: function(id) {
    var lists = this;
    
    var list;
    if (list = this.get(id)){
      list.fetch();
    } else {
      list = new Wunderclone.Models.List({id: id})
      list.fetch({
        success: function() { lists.add(list) }
      });
    }
    
    return list;
  },
  
  // getPreviousModel: function(model){
  //   return this.at(this.indexOf(model) - 1);
  // }
  
  // add parse for tasks of every list, make sure api is sending down same things
  
  // parse: function(payload){
  //   var lists = this;
  //   payload.each(function(list){
  //     if (list.get('name') == "Inbox"){
  //       var list = new Wunderclone.Models.Inbox({id: list.id})
  //       lists.add(list);
  //       payload = payload.without(payload.findWhere({id: list.id}));
  //       return payload;
  //     }
  //   })
  // }

});
