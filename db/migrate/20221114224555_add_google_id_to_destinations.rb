class AddGoogleIdToDestinations < ActiveRecord::Migration[7.0]
   def change
      add_column :destinations, :google_id, :string
      change_column :places, :google_id, :string
   end
end
