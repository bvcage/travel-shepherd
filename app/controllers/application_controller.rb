class ApplicationController < ActionController::API
   include ActionController::Cookies

   before_action :authorize
   def authorize
      pp session
      render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
   end
   
   rescue_from ActiveRecord::RecordInvalid, with: :record_invalid_message

   def record_invalid_message err
      pp err
      render json: {error: err.message}, status: :unprocessable_entity
   end

end
