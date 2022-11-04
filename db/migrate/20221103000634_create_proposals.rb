class CreateProposals < ActiveRecord::Migration[7.0]
  def change
    create_table :proposals do |t|
      t.integer :traveler_id
      t.integer :destination_id
      t.integer :trip_id

      t.timestamps
    end
  end
end
