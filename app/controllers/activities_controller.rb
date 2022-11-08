class ActivitiesController < ApplicationController

   def index
      if params[:destination_id]
         destination = Destination.find(params[:destination_id])
         activities = destination.activities
      elsif params[:trip_id]
         trip = Trip.find(params[:trip_id])
         activities = trip.activities
      else
         activities = Activity.all
      end
      render json: activities
   end
   
end
