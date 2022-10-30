class User < ApplicationRecord
   validates_presence_of :first_name, :last_name, :username, :email
   validates_uniqueness_of :username, :email
   has_one :login
end
