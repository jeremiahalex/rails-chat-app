class MessagesChannel < ApplicationCable::Channel
  def subscribed
    puts "new subscription to messages channel from: #{current_user}"
    # stream_from 'messages'
    # anything on the messages channel in redis should be streamed to subscribers
    puts "stream_from messages:#{params[:room]}"
    stream_from "messages:#{params[:room]}"

    # alternatively we can use the roomid as a channel indicator
    # chatroom = Chatroom.find(params[:id])
    # stream_for chatroom
  end

  def unsubscribed
    puts ": #{current_user} unsubscribed"
  end

  # A common use case is to rebroadcast a message sent by one client to any other connected clients.
  def receive(data)
    puts "messages:#{params[:room]} received #{data} from #{current_user}"
    ActionCable.server.broadcast("messages:#{params[:room]}", data)
  end
end
