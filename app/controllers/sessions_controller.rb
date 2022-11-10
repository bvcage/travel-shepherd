class SessionsController < ApplicationController
   skip_before_action :auth, only: :create

   def create
      user = User.find_by(email: params[:email])
      if user && user.login.authenticate(params[:password])
         session[:user_id] = user.id
         render json: user, status: :created
      else
         render json: {error: "Invalid user or password"}, status: :unauthorized
      end
   end

   def destroy
      session.delete :user_id
      head :no_content
   end

end
