class Destination < ApplicationRecord
   # validations
   validates_presence_of :country_id
   # relations
   belongs_to :country
   has_many :proposals
   has_many :places
   has_many :activities, through: :places

   def gen_label
      label = ""
      if not (self.locality.nil? || self.locality.blank?)
         label += "#{self.locality}, "
      end
      if not self.region.nil? then label += "#{self.region}, " end
      label += self.country.name
      label.titleize
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
      self.where("lower(label) LIKE ?", "%#{name.downcase}%")
   end

end
