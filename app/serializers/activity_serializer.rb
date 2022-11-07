class ActivitySerializer < ActiveModel::Serializer
   attributes :id, :destination_id, :place, :activity_type, :name, :description
   belongs_to :destination
   belongs_to :place
end
