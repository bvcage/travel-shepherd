class CreateTripStatuses < ActiveRecord::Migration[7.0]
   def change
      create_table :trip_statuses do |t|
         t.string :name
         t.integer :code

         t.timestamps
      end
   end
end
