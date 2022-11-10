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

   def self.setup_shell_user params
      # parse name if one was provided
      if not params[:name].nil?
         name = params[:name].split(' ')
         last_name = name.pop
         first_name = name.join(' ')
      else
         first_name = params[:name]
         last_name = nil
      end
      # create user, skipping validations
      user = User.new({
         email: params[:user_email],
         first_name: first_name,
         last_name: last_name,
         has_signed_up: false
      })
      user.save!(validate: false)
      return user
   end

   
end
