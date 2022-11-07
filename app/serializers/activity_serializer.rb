class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :destination_id, :place_id, :activity_type_id, :name, :description
end
