class Trip < ApplicationRecord
   has_many :invites
   has_many :itineraries
   has_many :events, through: :itineraries
   has_many :proposals
   has_many :travelers
   has_many :users, through: :travelers
   has_many :votes
   belongs_to :trip_status
   belongs_to :owner, class_name: "User"
   belongs_to :voting_type, optional: true
   belongs_to :winning_proposal, class_name: "Proposal", optional: true
   has_one :destination, through: :winning_proposal
   has_many :activities, through: :winning_proposal

   def calc_voting_results
      winning_proposal = self.proposals.sort{ |a,b| a.point_total <=> b.point_total }.last
      trip_status = TripStatus.find_by(code: 400)
      self.update!(
         name: self.name + " to " + winning_proposal.destination.name,
         winning_proposal_id: winning_proposal.id,
         trip_status_id: trip_status.id
      )
      winning_proposal
   end

   after_create do |trip|
      if trip.name.last(5).downcase != " trip"
         if trip.name.last(1) == " " then trip.update!(name: trip.name + "Group Trip")
         else trip.update!(name: trip.name + " Group Trip") end
      end
   end

end
