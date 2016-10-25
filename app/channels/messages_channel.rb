class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # we can steam all messages with the below
    # stream_from 'messages'
    # stream specific messages in a room
    stream_from "messages:#{params[:room]}"
  end

  def unsubscribed
    puts ": #{current_user} unsubscribed"
  end

  # A common use case is to rebroadcast a message sent by one client to any other connected clients.
  def receive(data)
    puts "messages:#{params[:room]} received #{data} from #{current_user}"
    # we can relay the received message without the model if we want.
    # ActionCable.server.broadcast("messages", data)
  end
end
