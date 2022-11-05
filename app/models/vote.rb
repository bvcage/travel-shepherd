class Vote < ApplicationRecord
   # relations
   belongs_to :proposal
   belongs_to :traveler
   has_one :user, through: :traveler
   belongs_to :trip
end
