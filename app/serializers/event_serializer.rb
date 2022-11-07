class EventSerializer < ActiveModel::Serializer
   attributes :id, :activity, :name, :start_time, :end_time, :duration_in_minutes
   belongs_to :activity
end
