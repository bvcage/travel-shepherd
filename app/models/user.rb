class User < ApplicationRecord
   validates_presence_of :first_name, :last_name, :email, :username
   validates_uniqueness_of :email, :message => "already taken"
   validates :username,
      format: {
         with: /\A[A-Z0-9_.]+\z/i,
         message: "cannot have special characters"
      },
      uniqueness: { case_sensitivie: false, message: "already taken" }
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
      if params[:username].nil?
         username = "user" + 10.times.map{rand(0..9)}.join
      else
         username = params[:username]
      end
      # create user, skipping validations
      user = User.new({
         email: params[:user_email],
         username: username,
         first_name: first_name,
         last_name: last_name,
         has_signed_up: false
      })
      user.save!(validate: false)
      return user
   end

   after_create do |user|
      if user.has_signed_up.nil? then user.update!(has_signed_up: false) end
   end
   
end
