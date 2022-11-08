class PlaceTypesController < ApplicationController

   def index
      place_types = PlaceType.all
      render json: place_types
   end
   
end
