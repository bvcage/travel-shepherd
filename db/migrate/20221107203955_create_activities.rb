class CreateActivities < ActiveRecord::Migration[7.0]
  def change
    create_table :activities do |t|
      t.integer :destination_id
      t.integer :place_id
      t.integer :activity_type_id
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
