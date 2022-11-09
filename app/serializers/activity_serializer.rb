class ActivitySerializer < ActiveModel::Serializer
   attributes :id, :destination_id, :place, :activity_type, :name, :description, :points
   belongs_to :destination
   belongs_to :place

   def points
      self.object.calc_points
   end

end
