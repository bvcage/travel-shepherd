class DestinationSerializer < ActiveModel::Serializer
   attributes :id, :municipality, :region, :postal_area, :country, :name

   def name
      self.object.name
   end
   
end
