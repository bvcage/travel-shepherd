class PlacesController < ApplicationController

   def create
      pp place_params
      place = Place.find_or_create_by!(place_params)
      render json: place, status: :accepted
   end

   def index
      if params[:destination_id]
         destination = Destination.find(params[:destination_id])
         places = destination.places
      else
         places = Place.all
      end
      render json: places
   end

   private

   def place_params
      params.permit(:name, :street_number, :street_name, :street_type, :destination_id, :place_type_id, :google_id)
   end

end
