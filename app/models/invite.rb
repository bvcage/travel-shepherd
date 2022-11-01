class Invite < ApplicationRecord
   belongs_to :trip
   belongs_to :user
   belongs_to :visit_status
end
