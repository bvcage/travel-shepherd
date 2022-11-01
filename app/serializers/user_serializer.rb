class UserSerializer < ActiveModel::Serializer
  attributes :id,
   :username,
   :email,
   :first_name,
   :last_name,
   :full_name,
   :date_of_birth,
   :photo_url

   def full_name
      self.object.full_name
   end
   
end
