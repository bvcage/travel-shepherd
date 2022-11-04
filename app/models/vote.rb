class Vote < ApplicationRecord
   # relations
   belongs_to :proposal
   belongs_to :traveler
   belongs_to :trip
end
