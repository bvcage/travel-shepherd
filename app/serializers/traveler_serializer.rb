class TravelerSerializer < ActiveModel::Serializer
   attributes :id, :trip, :user, :has_voted_for_proposal, :has_voted_for_activities
end
