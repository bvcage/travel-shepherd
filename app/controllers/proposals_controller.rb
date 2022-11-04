class ProposalsController < ApplicationController

   def create
      user = User.find(params[:user_id])
      traveler = Traveler.find_by!(user_id: user.id, trip_id: params[:trip_id])
      proposal = Proposal.create!(**proposal_params,
         traveler_id: traveler.id
      )
      render json: proposal, status: :created
   end

   def index
      if params[:trip_id]
         trip = Trip.find(params[:trip_id])
         proposals = trip.proposals
      else
         proposals = Proposal.all
      end
      render json: proposals
   end

   private

   def proposal_params
      params.permit(:id, :destination_id, :trip_id, :traveler_id)
   end

end
