class ActivityVoteSerializer < ActiveModel::Serializer
  attributes :id, :proposal_id, :traveler_id, :trip_id, :activity_id, :points
end
