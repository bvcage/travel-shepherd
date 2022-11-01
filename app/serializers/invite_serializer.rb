class InviteSerializer < ActiveModel::Serializer
  attributes :id, :trip_id, :user_id, :status_id
end
