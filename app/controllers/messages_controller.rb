class MessagesController < ApplicationController

  def create
    message = Message.new(message_params)
    message.user = current_user
    if message.save
        # broadcast the newely created message
        MessagesChannel.broadcast_to(message.chatroom_id, {message: message.content, user: message.user.username})
        head :ok
    end
  end

  private

    def message_params
      params.require(:message).permit(:content, :chatroom_id)
    end
end
