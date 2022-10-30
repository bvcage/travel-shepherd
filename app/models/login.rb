class Login < ApplicationRecord
   belongs_to :user, dependent: :delete
   has_secure_password
   validates_presence_of :user_id, :password
   validates_uniqueness_of :user_id
end
