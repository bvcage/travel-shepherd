class AddMiAndLastVisitedToUsers < ActiveRecord::Migration[7.0]
   def change
      add_column :users, :middle_name, :string
      add_column :users, :last_destination_visited, :string
   end
end
