class TravelersController < ApplicationController

   def index
      if params[:trip_id]
         trip = Trip.find(params[:trip_id])
         travelers = trip.travelers
      else
         travelers = Traveler.all
      end
      render json: travelers
   end
   
end
