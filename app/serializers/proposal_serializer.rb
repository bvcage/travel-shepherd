class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :traveler_id
  has_one :user
  belongs_to :destination
  belongs_to :trip
end
