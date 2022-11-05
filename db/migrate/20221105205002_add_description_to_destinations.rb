class AddDescriptionToDestinations < ActiveRecord::Migration[7.0]
   def change
      add_column :destinations, :summary, :string
      add_column :destinations, :description, :text
   end
end
