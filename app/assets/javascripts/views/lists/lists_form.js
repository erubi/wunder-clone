Wunderclone.Views.ListsForm = Backbone.View.extend({
  tagName: 'form',
  className: "list-form",
  
  template: JST['lists/form'],
  
  events: {
    'submit' : 'submit'
  },
  
  render: function(){
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    
    return this;
  },
  
  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.collection.create(attrs, {
      success: function(list){
        Backbone.history.navigate("#/lists/" + list.id, { trigger: true });
      }
    });
  }
});