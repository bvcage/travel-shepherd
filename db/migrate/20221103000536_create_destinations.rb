class CreateDestinations < ActiveRecord::Migration[7.0]
  def change
    create_table :destinations do |t|
      t.string :town_or_city
      t.string :district
      t.string :postal_area
      t.string :country

      t.timestamps
    end
  end
end
