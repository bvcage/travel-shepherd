class CreateInvites < ActiveRecord::Migration[7.0]
  def change
    create_table :invites do |t|
      t.integer :trip_id
      t.integer :user_id
      t.integer :status_id

      t.timestamps
    end
  end
end
