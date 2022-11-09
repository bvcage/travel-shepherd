class Activity < ApplicationRecord
   belongs_to :activity_type
   belongs_to :destination
   belongs_to :place
   has_many :proposed_itineraries
   has_many :activity_votes

   def calc_points
      self.activity_votes.sum(:points)
   end
end
