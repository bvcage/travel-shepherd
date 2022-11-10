class UsersController < ApplicationController

   skip_before_action :auth, only: [:create, :exist]

   def auth
      user = User.find(session[:user_id])
      render json: user
   end

   def create
      user = User.find_or_create_by(email: params[:email])
      user.update!(user_params)
      if (user && params[:password])
         login = Login.find_or_create_by(user_id: user.id)
         login.update!(password: params[:password])
      end
      render json: user, status: :created
   end

   def exist
      user = User.find_by!(username: params[:username])
      render json: user
   end

   def index
      if (params[:trip_id])
         trip = Trip.find(params[:trip_id])
         users = trip.users
      else
         users = User.all
      end
      render json: users
   end

   def show
      user = User.find(params[:id])
      render json: user
   end

   def update
      user = User.find(params[:id])
      user.update!(user_params)
      render json: user, status: :accepted
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
