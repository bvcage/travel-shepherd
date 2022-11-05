class TravelerSerializer < ActiveModel::Serializer
   attributes :id, :trip, :user, :has_voted
end
