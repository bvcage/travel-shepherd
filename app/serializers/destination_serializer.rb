class DestinationSerializer < ActiveModel::Serializer
   attributes :id, :locality, :region, :postal_area, :country, :label, :summary, :description, :lat, :lon, :google_id, :image_src
   
end
