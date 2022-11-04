class DestinationsController < ApplicationController

   def index
      destinations = []
      if params[:country_id]
         country = Country.find(params[:country_id])
         destinations = country.destinations
      elsif params.keys.length > 0
         params.each do |key, value|
            case (key)
            when 'sample'
               destinations = Destination.explore_sample value
            end
         end
      end
      destinations = destinations.order(:municipality)
      render json: destinations
   end

   def show
      destination = Destination.find(params[:id])
      render json: destination
   end
   
end
