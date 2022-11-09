class AddActivityVoteColToTraveler < ActiveRecord::Migration[7.0]
   def change
      rename_column :travelers, :has_voted, :has_voted_for_proposal
      add_column :travelers, :has_voted_for_activities, :boolean
   end
end
