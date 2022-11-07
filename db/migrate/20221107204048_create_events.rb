class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.integer :activity_id
      t.integer :itinerary_id
      t.string :name
      t.timestamp :start_time
      t.timestamp :end_time
      t.integer :duration_in_minutes

      t.timestamps
    end
  end
end
