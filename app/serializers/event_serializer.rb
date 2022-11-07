class EventSerializer < ActiveModel::Serializer
  attributes :id, :activity_id, :itinerary_id, :name, :start_time, :end_time, :duration_in_minutes
end
