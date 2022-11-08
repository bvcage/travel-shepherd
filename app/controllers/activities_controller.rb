class ActivitiesController < ApplicationController

   def index
      if params[:destination_id]
         destination = Destination.find(params[:destination_id])
         activities = destination.activities
      else
         activities = Activity.all
      end
      render json: activities
   end
   
end
