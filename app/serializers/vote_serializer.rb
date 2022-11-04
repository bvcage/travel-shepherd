class VoteSerializer < ActiveModel::Serializer
  attributes :id, :proposal_id, :traveler_id, :trip_id, :points
end
