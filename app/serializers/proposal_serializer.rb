class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :traveler_id, :trip_id
  has_one :user
  belongs_to :destination
end
