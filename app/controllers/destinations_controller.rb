class DestinationsController < ApplicationController

   def create
      country = Country.find_or_create_by(name: params[:country].titleize)
      region = params[:region].titleize
      municipality = params[:municipality].titleize
      destination = Destination.find_or_create_by!(
         municipality: municipality,
         country_id: country.id
      )
      destination.update!(name: destination.gen_name)
      if region && destination.region.nil? then destination.update!(region: region) end
      render json: destination, status: :accepted
   end

   def index
      destinations = Destination.all
      # only return destinations for country
      if params[:country_id]
         country = Country.find(params[:country_id])
         destinations = country.destinations.order(:municipality)
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
