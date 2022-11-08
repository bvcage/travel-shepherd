class ProposedItinerarySerializer < ActiveModel::Serializer
  attributes :id, :activity_id, :proposal_id
  belongs_to :activity
  belongs_to :proposal
end
