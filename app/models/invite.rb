class Invite < ApplicationRecord
   belongs_to :trip, dependent: :destroy
   belongs_to :user, dependent: :destroy
   belongs_to :invite_status

   validates_uniqueness_of :user_id, {scope: :trip_id, message: 'already invited'}
end
