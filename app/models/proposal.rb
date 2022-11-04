class Proposal < ApplicationRecord
   belongs_to :destination
   belongs_to :trip
   belongs_to :traveler
   has_one :user, through: :traveler
end
