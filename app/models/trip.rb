class Trip < ApplicationRecord
   has_many :invites
   has_many :itineraries
   has_many :events, through: :itineraries
   has_many :proposals
   has_many :travelers
   has_many :users, through: :travelers
   has_many :votes
   belongs_to :owner, class_name: "User"
   belongs_to :voting_type, optional: true
   belongs_to :winning_proposal, class_name: "Proposal", optional: true
   has_one :destination, through: :winning_proposal
   has_many :activities, through: :winning_proposal

   def calc_voting_results
      winning_proposal = self.proposals.sort{ |a,b| a.point_total <=> b.point_total }.last
      self.update!(name: self.name + ' trip to ' + winning_proposal.destination.name, winning_proposal_id: winning_proposal.id)
      winning_proposal
   end

end
