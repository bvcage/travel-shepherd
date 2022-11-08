class ActivityTypesController < ApplicationController

   def index
      activity_types = ActivityType.all.order(:name)
      render json: activity_types
   end
   
end
