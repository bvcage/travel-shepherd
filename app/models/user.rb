class User < ApplicationRecord
   validates_presence_of :first_name, :last_name, :username, :email
   validates_uniqueness_of :username, :email
   has_one :login
   has_many :travelers
   has_many :trips, through: :travelers
   has_many :invites

   def full_name
      "#{self.first_name} #{self.last_name}"
   end
   
end
