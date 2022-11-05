class AddHasVotedToTravelers < ActiveRecord::Migration[7.0]
   def change
      add_column :travelers, :has_voted, :boolean
   end
end
