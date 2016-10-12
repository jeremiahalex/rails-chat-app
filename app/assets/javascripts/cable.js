// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

  // create a subscrition to the messages channel, we should then get a stream of messages
  App.messages = App.cable.subscriptions.create('MessagesChannel', {
    received: function(data) {
        if (data.room == current_room_id){
          console.log('ActionCable messages data recieved on client:', data)
          $("#messages").removeClass('hidden')
          $('#messages').append("<p> <b>" + data.user + ": </b>" + data.message + "</p>" );
      }
    }
  })
  console.log('ActionCable subcription to messages created on client')
  // When this subscriptions.create function is invoked, it will invoke the MessagesChannel#subscribed method, which is in fact a callback method.


}).call(this);
