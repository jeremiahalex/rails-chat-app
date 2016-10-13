/* globals $ App current_room_id */
$(document).on('turbolinks:load', function () {
  submitNewMessage()
})

function submitNewMessage () {
  $('textarea#message_content').keydown(function (event) {
    if (event.keyCode == 13) {
      // use to send direct through action cable rather than ajax
      App.messages.send({ user: '[from cable] ' + current_username, message: $('[data-textarea="message"]').val() })
      // or through Ajax
      $('[data-send="message"]').click()
      $('[data-textarea="message"]').val(' ')

      return false
    }
  })
}
