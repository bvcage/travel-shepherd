class Trip < ApplicationRecord
   has_many :invites
   has_many :proposals
   has_many :travelers
   has_many :users, through: :travelers
   belongs_to :owner, class_name: "User"
   belongs_to :voting_type, optional: true
end
