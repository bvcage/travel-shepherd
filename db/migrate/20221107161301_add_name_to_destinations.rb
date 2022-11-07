class AddNameToDestinations < ActiveRecord::Migration[7.0]
   def change
      add_column :destinations, :name, :string
   end
end
