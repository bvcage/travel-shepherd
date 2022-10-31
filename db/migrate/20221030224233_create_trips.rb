class CreateTrips < ActiveRecord::Migration[7.0]
  def change
    create_table :trips do |t|
      t.string :name
      t.integer :num_days
      t.timestamp :start_date
      t.timestamp :end_date
      t.timestamp :voting_deadline
      t.boolean :allow_proposals
      t.integer :voting_type

      t.timestamps
    end
  end
end
