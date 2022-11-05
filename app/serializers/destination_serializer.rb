class DestinationSerializer < ActiveModel::Serializer
   attributes :id, :municipality, :region, :postal_area, :country, :name, :summary, :description

   def name
      self.object.name
   end
   
end
