class CreateVotingTypes < ActiveRecord::Migration[7.0]
   def change
      create_table :voting_types do |t|
         t.string :name
         t.integer :value

         t.timestamps
      end

      rename_column :trips, :voting_type, :voting_type_id
   end
end
