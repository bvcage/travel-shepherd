class EventsController < ApplicationController

   def index
      if params[:trip_id]
         trip = Trip.find(params[:trip_id])
         events = trip.events
      else
         events = Event.all
      end
      events.sort_by(&:start_time)
      render json: events
   end

end
