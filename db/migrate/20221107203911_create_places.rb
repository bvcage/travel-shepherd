class CreatePlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :places do |t|
      t.string :name
      t.integer :place_type_id
      t.string :street_number
      t.string :building_name
      t.string :street_number_suffix
      t.string :street_name
      t.string :street_type
      t.string :street_direction
      t.string :address_type
      t.string :address_type_identifier
      t.integer :destination_id
      t.integer :google_id

      t.timestamps
    end
  end
end
