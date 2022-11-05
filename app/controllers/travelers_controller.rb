class TravelersController < ApplicationController

   def index
      travelers = Traveler.all
      if params.keys.length > 0
         params.each do |key, value|
            case key
            when 'trip_id'
               travelers = travelers.filter{ |traveler| traveler.trip_id == value.to_i }
            when 'user_id'
               travelers = travelers.filter{ |traveler| traveler.user_id == value.to_i }
            else
               travelers = travelers
            end
         end
      end
      render json: travelers
   end
   
end
