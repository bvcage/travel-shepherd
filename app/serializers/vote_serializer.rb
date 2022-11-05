class VoteSerializer < ActiveModel::Serializer
   attributes :id, :proposal, :traveler_id, :trip_id, :points, :user
end
