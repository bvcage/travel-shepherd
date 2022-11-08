class CreateProposedItineraries < ActiveRecord::Migration[7.0]
  def change
    create_table :proposed_itineraries do |t|
      t.integer :activity_id
      t.integer :proposal_id

      t.timestamps
    end
  end
end
