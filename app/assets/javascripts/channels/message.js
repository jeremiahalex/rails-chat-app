/* globals $ App current_room_id */
$(document).on('turbolinks:load', function () {
  connectToChat()
})

function connectToChat () {
  // create a subscrition to the messages channel, we should then get a stream of messages
  if (typeof current_room_id !== 'undefined') {
    App.messages = App.cable.subscriptions.create({ channel: 'MessagesChannel', room: current_room_id }, {
      received: function (data) {
        console.log('ActionCable messages data recieved on client:', data)
        $('#messages').removeClass('hidden')
        $('#messages').append('<p> <b>' + data.user + ': </b>' + data.message + '</p>')
      },
      connected: function () {
        // Called when the subscription is ready for use on the server
        console.log('connected')
      },

      disconnected: function () {
        // Called when the subscription has been terminated by the server
        console.log('disconnected')
      },
      rejected: function (data) {
        // Called when there's incoming data on the websocket for this channel
        console.log('rejected')
      }
    })
    console.log('ActionCable subcription to messages created on client')
  }
}
