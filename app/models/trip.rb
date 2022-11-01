class Trip < ApplicationRecord
   has_many :travelers
   has_many :users, through: :travelers
   has_many :invites
end
