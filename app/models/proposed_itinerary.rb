class ProposedItinerary < ApplicationRecord
   belongs_to :proposal
   belongs_to :activity
end
