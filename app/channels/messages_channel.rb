class MessagesChannel < ApplicationCable::Channel
  def subscribed
    puts "new subscription to messages channel"
    stream_from 'messages'
    # anything on the messages channel in redis should be streamed to subscribers
  end
end
