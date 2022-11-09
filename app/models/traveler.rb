class Traveler < ApplicationRecord
   validates_presence_of :user_id, :trip_id
   validates :user_id, {
      uniqueness: {scope: :trip_id, message: 'cannot duplicate entry'}
   }
   
   belongs_to :user, dependent: :destroy
   belongs_to :trip, dependent: :destroy

   after_create do |traveler|
      if traveler.has_voted_for_proposal.nil? then traveler.update!(has_voted_for_proposal: false) end
      if traveler.has_voted_for_activities.nil? then traveler.update!(has_voted_for_activities: false) end
   end
end
