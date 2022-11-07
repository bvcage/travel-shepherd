class CreateItineraries < ActiveRecord::Migration[7.0]
  def change
    create_table :itineraries do |t|
      t.integer :event_id
      t.integer :trip_id

      t.timestamps
    end
  end
end
