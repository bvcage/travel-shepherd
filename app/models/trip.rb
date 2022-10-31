class Trip < ApplicationRecord
   has_many :travelers
   has_many :users, through: :travelers
end
