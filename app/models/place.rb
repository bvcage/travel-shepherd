class Place < ApplicationRecord
   belongs_to :place_type
   belongs_to :destination
end
