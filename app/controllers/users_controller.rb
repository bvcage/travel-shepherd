class UsersController < ApplicationController

   def create
      user = User.create!(user_params)
      if (user && params[:password])
         Login.create!(
            user_id: user.id,
            password: params[:password]
         )
      end
      render json: user, status: :created
   end

   def show
      user = User.find(session[:user_id])
      render json: user
   end

   private

   def user_params
      params.permit(
         :id,
         :username,
         :email,
         :first_name,
         :last_name,
         :date_of_birth,
         :photo_url
      )
   end

end
