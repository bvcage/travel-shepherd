class InviteSerializer < ActiveModel::Serializer
   attributes :id, :trip_id
   has_one :invite_status
   has_one :user
end
