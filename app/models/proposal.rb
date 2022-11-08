class Proposal < ApplicationRecord
   belongs_to :destination
   belongs_to :trip
   belongs_to :traveler
   has_one :user, through: :traveler
   has_many :proposed_itineraries
   has_many :votes

   def point_total
      votes = self.votes
      if votes.any?
         votes.sum(:points)
      else
         0
      end
   end

end
