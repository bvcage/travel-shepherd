class ActivitiesController < ApplicationController

   def create
      activity = Activity.create!(activity_params)
      render json: activity, status: :created
   end

   def index
      if params[:destination_id]
         destination = Destination.find(params[:destination_id])
         activities = destination.activities
      elsif params[:trip_id]
         trip = Trip.find(params[:trip_id])
         activities = trip.activities
         activities = activities.sort_by(&:calc_points).reverse
      else
         activities = Activity.all
      end
      render json: activities
   end

   private

   def activity_params
      params.permit(:name, :description, :activity_type_id, :place_id, :destination_id)
   end
   
end
