class DestinationSerializer < ActiveModel::Serializer
  attributes :id, :town_or_city, :district, :postal_area, :country
end
