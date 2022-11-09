class UpdateVotingColsInTrips < ActiveRecord::Migration[7.0]
   def change
      rename_column :trips, :voting_is_open, :proposal_voting_is_open?
      rename_column :trips, :voting_opens_at, :proposal_voting_opens_at
      rename_column :trips, :voting_closes_at, :proposal_voting_closes_at
      add_column :trips, :activity_voting_is_open?, :boolean
      add_column :trips, :activity_voting_opens_at, :timestamp
      add_column :trips, :activity_voting_closes_at, :timestamp
      add_column :trips, :trip_status_id, :integer
   end
end
