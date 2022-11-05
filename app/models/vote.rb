class Vote < ApplicationRecord
   # validations
   validates_presence_of :proposal_id, :traveler_id, :trip_id
   validates_uniqueness_of :traveler_id, {scope: :proposal_id, message: "already has Vote for given Proposal"}
   # relations
   belongs_to :proposal
   belongs_to :traveler
   has_one :user, through: :traveler
   belongs_to :trip
end
