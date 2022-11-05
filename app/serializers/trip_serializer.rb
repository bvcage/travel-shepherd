class TripSerializer < ActiveModel::Serializer
   attributes :id, :name, :num_days, :start_date, :end_date, :voting_opens_at, :voting_closes_at, :voting_is_open, :allow_proposals, :owner, :winning_proposal_id
   belongs_to :voting_type
   belongs_to :owner
   has_many :travelers
   has_many :invites
   has_many :proposals
   has_one :destination
end
