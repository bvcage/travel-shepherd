class ActivityVote < ApplicationRecord
   belongs_to :activity
   belongs_to :traveler
   belongs_to :trip

   def self.gen_points rank
      case rank
      when 1
         return 10
      when 2
         return 3
      when 3
         return 2
      when 4
         return 1
      else
         return 0
      end
   end

end
