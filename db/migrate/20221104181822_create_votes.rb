class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.integer :proposal_id
      t.integer :traveler_id
      t.integer :trip_id
      t.integer :points

      t.timestamps
    end
  end
end
