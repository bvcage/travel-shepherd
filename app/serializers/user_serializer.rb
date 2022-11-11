class UserSerializer < ActiveModel::Serializer
  attributes :id,
   :username,
   :first_name,
   :last_name,
   :full_name,
   :email,
   :date_of_birth,
   :photo_url,
   :has_signed_up,
   :created_at

   def full_name
      self.object.full_name
   end
   
end
