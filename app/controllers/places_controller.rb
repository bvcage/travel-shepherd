class PlacesController < ApplicationController

   def index
      if params[:destination_id]
         destination = Destination.find(params[:destination_id])
         places = destination.places
      else
         places = Place.all
      end
      render json: places
   end

end
