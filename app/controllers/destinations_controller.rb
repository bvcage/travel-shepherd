class DestinationsController < ApplicationController

   skip_before_action :auth, only: [:explore, :show]

   def create
      country = Country.find_or_create_by(name: params[:country].titleize)
      region = params[:region].titleize
      locality = params[:locality].titleize
      destination = Destination.find_or_create_by!(
         locality: locality,
         country_id: country.id
      )
      destination.update!(name: destination.gen_label)
      if region && destination.region.nil? then destination.update!(region: region) end
      render json: destination, status: :accepted
   end

   def explore
      destinations = Destination.all.order("RANDOM()")
      render json: destinations, each_serializer: DestinationExploreSerializer
   end

   def index
      destinations = Destination.all
      # only return destinations for country
      if params[:country_id]
         country = Country.find(params[:country_id])
         destinations = country.destinations.order(:locality)
      # only return random sample
      elsif params[:sample]
         destinations = Destination.explore_sample params[:sample]
      # loop thru remaining queries
      elsif params.keys.length > 0
         params.each do |key, value|
            case (key)
            when 'name'
               destinations = destinations.filter_by_name(params[:name])
            end
         end
      end
      render json: destinations
   end

   def show
      destination = Destination.find(params[:id])
      
      render json: destination
   end

end
