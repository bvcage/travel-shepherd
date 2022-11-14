class AddLatLonToDestinations < ActiveRecord::Migration[7.0]
   def change
      add_column :destinations, :lat, :float
      add_column :destinations, :lon, :float
      rename_column :destinations, :municipality, :locality
      rename_column :destinations, :name, :label
      add_column :destinations, :region_code, :string, :after => :region
   end
end
