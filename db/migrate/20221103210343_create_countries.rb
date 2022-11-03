class CreateCountries < ActiveRecord::Migration[7.0]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :iso2, limit: 2
      t.string :iso3, limit: 3
      t.string :flag

      t.timestamps
    end
  end
end
