class Destination < ApplicationRecord
   belongs_to :country
   has_many :proposals

   def self.explore_sample value
      explore_sample = []
      countries = Country.all
      value.to_i.times do
         country = countries.sample
         explore_sample.push country.destinations.sample
         countries = countries.filter{|country2| country2.id != country.id}
      end
      explore_sample
   end
end
