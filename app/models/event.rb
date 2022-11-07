class Event < ApplicationRecord
   belongs_to :activity
   has_one :itinerary

   after_create do |event|
      if end_time.nil?
         if duration_in_minutes.nil? then duration_in_minutes = rand(30..120) end
         duration_in_minutes = duration_in_minutes - [duration_in_minutes % 10, duration_in_minutes % 15].min
         end_time = start_time + duration_in_minutes*60
         event.update(
            duration_in_minutes: duration_in_minutes,
            end_time: end_time
         )
      end
   end

   def round_off
      if not (time % 10 == 0 || time % 15 == 0)
         time = time - [time % 10, time % 15].min
      end
      time
   end

end
