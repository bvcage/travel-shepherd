class ProposedItinerary < ApplicationRecord
   validates :activity_id, uniqueness: {scope: :proposal_id, message: "already nominated for this trip"}
   belongs_to :proposal
   belongs_to :activity
end
