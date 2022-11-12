class UserSerializer < ActiveModel::Serializer
  attributes :id,
   :username,
   :first_name,
   :last_name,
   :middle_initial,
   :full_name,
   :email,
   :date_of_birth,
   :photo_url,
   :has_signed_up,
   :created_at,
   :last_destination_visited

   def full_name
      self.object.full_name
   end

   def middle_initial
      self.object.middle_initial
   end
   
end
