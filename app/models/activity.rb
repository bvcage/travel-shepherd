class Activity < ApplicationRecord
   belongs_to :activity_type
   belongs_to :destination
   belongs_to :place
end
