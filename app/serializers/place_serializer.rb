class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :place_type, :street_number, :building_name, :street_number_suffix, :street_name, :street_type, :street_direction, :address_type, :address_type_identifier, :destination_id, :google_id
  belongs_to :place_type
end
