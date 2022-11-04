class TripSerializer < ActiveModel::Serializer
   attributes :id, :name, :num_days, :start_date, :end_date, :voting_deadline, :allow_proposals, :owner
   belongs_to :voting_type
   has_many :travelers
   has_many :invites
   has_many :proposals
end
