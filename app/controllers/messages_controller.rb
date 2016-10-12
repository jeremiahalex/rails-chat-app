class MessagesController < ApplicationController

  def create
    message = Message.new(message_params)
    message.user = current_user
    if message.save
        puts "#{current_user.username}: new message created"
        # broadcast to the MESSAGES CHANNEL, with some JSON { MESSAGE and USER }
        ActionCable.server.broadcast 'messages', message: message.content, user: message.user.username, room: message.chatroom_id

        puts "#{current_user.username}: new message broadcasted"
        # this is managed by redis - effectively we cache the messages, the channel then picks them up and sends them
        head :ok
    end
  end

  private

    def message_params
      params.require(:message).permit(:content, :chatroom_id)
    end
end
