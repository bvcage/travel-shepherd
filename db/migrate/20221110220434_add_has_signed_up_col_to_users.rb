class AddHasSignedUpColToUsers < ActiveRecord::Migration[7.0]
   def change
      add_column :users, :has_signed_up, :boolean
   end
end
