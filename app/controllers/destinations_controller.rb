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
      # generate label
      label = destination.gen_label
      destination.update!(label: label)
      # get lat / lon
      url = "http://api.positionstack.com/v1/forward?" + URI.encode_www_form(
         "access_key" => ENV["POSITION_STACK_KEY"],
         "query" => label,
         "limit" => 1
      )
      api = HTTP.get(url).parse
      data = api["data"][0]
      destination.update(
         lat: data["latitude"].to_f,
         lon: data["longitude"].to_f,
         region: data["region"]
      )
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
