class Destination < ApplicationRecord
   # validations
   validates_presence_of :country_id
   # relations
   belongs_to :country
   has_many :proposals

   def gen_name
      name = ""
      if not (self.municipality.nil? || self.municipality.blank?)
         name += "#{self.municipality}, "
      end
      if not self.region.nil? then name += "#{self.region}, " end
      name += self.country.name
      name.titleize
   end

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

   def self.filter_by_name name
      self.where("lower(name) LIKE ?", "%#{name.downcase}%")
   end

end
