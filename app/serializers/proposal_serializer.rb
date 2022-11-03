class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :traveler_id, :destination_id
end
