class TripSerializer < ActiveModel::Serializer
   attributes :id,
      :trip_status,
      :name,
      :num_days,
      :start_date,
      :end_date,
      :proposal_voting_opens_at,
      :proposal_voting_closes_at,
      :proposal_voting_is_open?,
      :activity_voting_opens_at,
      :activity_voting_closes_at,
      :activity_voting_is_open?,
      :allow_proposals,
      :owner,
      :winning_proposal_id,
      :winning_proposal,
      :num_activities,
      :num_proposals
   belongs_to :voting_type
   belongs_to :owner
   has_many :travelers
   has_many :invites
   has_many :proposals
   has_one :destination

   def num_activities
      self.object.activities.count
   end

   def num_proposals
      self.object.proposals.count
   end

end
