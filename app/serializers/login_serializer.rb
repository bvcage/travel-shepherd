class LoginSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :password_digest
end
