class Trip < ApplicationRecord
   has_many :travelers
   has_many :users, through: :travelers
   has_many :invites
   belongs_to :owner, class_name: "User"
   belongs_to :voting_type, optional: true
end
