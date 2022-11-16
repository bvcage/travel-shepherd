class AddImagesToLocationTables < ActiveRecord::Migration[7.0]
   def change
      add_column :destinations, :image_src, :string
      add_column :places, :image_src, :string
      add_column :activities, :image_src, :string
   end
end
