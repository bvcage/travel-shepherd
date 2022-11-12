class UsersController < ApplicationController

   skip_before_action :auth, only: [:create, :exist]

   def auth
      user = User.find(session[:user_id])
      # render json: user
   end

   def create
      @user = User.find_or_create_by(email: params[:email])
      if @user.has_signed_up
         render json: { error: "email already taken" }, status: :forbidden
      else   
         @user.update!({**user_params, has_signed_up: true})
         if (@user && params[:password])
            Login.create!(user_id: @user.id, password: params[:password])
         end
         render json: @user, status: :created
      end
   end

   def exist
      if params[:username] then user = User.find_by!(username: params[:username])
      elsif params[:email] then user = User.find_by!(email: params[:email])
      end
      Login.find_by!(user_id: user.id)
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
      @user = User.find(params[:id])
      authorize @user
      @user.update!(user_params)
      puts "USERUSERUSERUSER"
      pp @user
      render json: @user, status: :accepted
   end

   private

   def user_params
      params.permit(
         :id,
         :username,
         :email,
         :first_name,
         :middle_name,
         :last_name,
         :date_of_birth,
         :photo_url,
         :has_signed_up,
         :last_destination_visited
      )
   end

end
