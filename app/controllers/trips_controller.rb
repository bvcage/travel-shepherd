class TripsController < ApplicationController

   def create
      trip = Trip.create!(trip_params)
      render json: trip, status: :created
   end

   def index
      if (params[:user_id])
         user = User.find(params[:user_id])
         trips = user.trips
      else
         trips = Trip.all
      end
      render json: trips
   end

   private

   def trip_params
      params.permit(:name, :num_days, :allow_proposals, :voting_type)
   end

end
