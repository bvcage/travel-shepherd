class ProposalSerializer < ActiveModel::Serializer
   attributes :id, :traveler_id, :destination, :point_total
   belongs_to :destination
   belongs_to :trip
   belongs_to :user
   has_many :votes

   def point_total
      self.object.point_total
   end
end
