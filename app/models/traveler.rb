class Traveler < ApplicationRecord
   validates_presence_of :user_id, :trip_id
   validates :user_id, {
      uniqueness: {scope: :trip_id, message: 'cannot duplicate entry'}
   }
   
   belongs_to :user, dependent: :destroy
   belongs_to :trip, dependent: :destroy
end
