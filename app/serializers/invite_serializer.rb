class InviteSerializer < ActiveModel::Serializer
   attributes :id, :sender
   has_one :invite_status
   has_one :user
   has_one :trip

   def sender
      user = User.find(self.object.sender_user_id)
      return {
         id: user.id,
         full_name: user.full_name
      }
   end

end
