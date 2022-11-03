class Proposal < ApplicationRecord
   belongs_to :traveler
   has_one :user, through: :traveler
   has_one :trip, through: :traveler
   belongs_to :destination
end
