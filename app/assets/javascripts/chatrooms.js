/* globals $ App current_room_id */
$(document).on('turbolinks:load', function () {
  submitNewMessage()
})

function submitNewMessage () {
  $('textarea#message_content').keydown(function (event) {
    if (event.keyCode == 13) {
      // can send message to actioncable, as well as triggering from the model creation
      App.messages.send({ user: current_username, message: $('[data-textarea="message"]').val() })
      $('[data-send="message"]').click()
      $('[data-textarea="message"]').val(' ')

      return false
    }
  })
}
