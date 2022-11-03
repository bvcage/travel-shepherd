class CreateDestinations < ActiveRecord::Migration[7.0]
  def change
    create_table :destinations do |t|
      t.string :municipality
      t.string :region
      t.string :postal_area
      t.integer :country_id

      t.timestamps
    end
  end
end
