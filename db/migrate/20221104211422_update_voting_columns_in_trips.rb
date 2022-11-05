class UpdateVotingColumnsInTrips < ActiveRecord::Migration[7.0]
   def change
      rename_column :trips, :voting_deadline, :voting_closes_at
      add_column :trips, :voting_opens_at, :datetime
      add_column :trips, :voting_is_open, :boolean
      add_column :trips, :winning_proposal_id, :integer
   end
end
