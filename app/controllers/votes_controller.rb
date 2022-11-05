class VotesController < ApplicationController

   def index
      if params[:trip_id]
         trip = Trip.find(params[:trip_id])
         votes = trip.votes
      else
         votes = Vote.all
      end
      render json: votes
   end

end
