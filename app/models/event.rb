class Event < ApplicationRecord
   belongs_to :activity
   has_one :itinerary

   after_create do |event|
      if end_time.nil?
         if duration_in_minutes.nil? then duration_in_minutes = rand(30..120) end
         end_time = event.start_time + duration_in_minutes*60
         event.update(
            duration_in_minutes: duration_in_minutes,
            end_time: end_time
         )
      end
   end

end
