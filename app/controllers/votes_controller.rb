class VotesController < ApplicationController

   def create
      if params[:traveler_id].nil? && params[:user_id]
         traveler = Traveler.find_by!(trip_id: params[:trip_id], user_id: params[:user_id])
         traveler_id = traveler.id
      else
         traveler_id = params[:traveler_id]
      end
      vote = Vote.create!(**vote_params,
         traveler_id: traveler_id
      )
      Traveler.find(traveler_id).update!(has_voted_for_proposal: true)
      render json: vote, status: :created
   end

   def index
      if params[:trip_id]
         trip = Trip.find(params[:trip_id])
         votes = trip.votes
      else
         votes = Vote.all
      end
      render json: votes
   end

   private

   def vote_params
      params.permit(:proposal_id, :trip_id, :points)
   end

end
