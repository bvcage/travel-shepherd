class DestinationsController < ApplicationController

   def index
      destinations = []
      if params.keys.length > 0
         params.each do |key, value|
            case (key)
            when 'sample'
               destinations = Destination.explore_sample value
            end
         end
      end
      destinations = destinations.uniq
      render json: destinations
   end

end
