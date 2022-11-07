class CountriesController < ApplicationController

   def index
      countries = Country.all.order(:name)
      # optional queryies
      if params.keys.length > 0
         params.each do |key, value|
            case key
            when 'name'
               countries = countries.where("lower(name) LIKE ?", "%#{value.downcase}%")
            end
         end
      end
      render json: countries
   end

end
