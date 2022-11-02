class ApplicationController < ActionController::API
   include ActionController::Cookies
   include Pundit::Authorization

   before_action :auth
   def auth
      pp session
      render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
   end
   
   rescue_from ActiveRecord::RecordInvalid, with: :record_invalid_message
   rescue_from Pundit::NotAuthorizedError, with: :user_unauthorized_message

   def record_invalid_message err
      pp err
      render json: {error: err.message}, status: :unprocessable_entity
   end

   def user_unauthorized_message err
      render json: {error: 'user cannot perfom this action'}, status: :rejected
   end

   private

   def pundit_user
      User.find(session[:user_id])
   end

end
