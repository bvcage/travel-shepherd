class ProposalsController < ApplicationController

   def create
      user = User.find(params[:user_id])
      traveler = Traveler.find_by!(user_id: user.id, trip_id: params[:trip_id])
      proposal = Proposal.create!(**proposal_params,
         traveler_id: traveler.id
      )
      render json: proposal, status: :created
   end

   def destroy
      @proposal = Proposal.find(params[:id])
      authorize @proposal
      @proposal.destroy
      head :no_content
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

   def show
      proposal = Proposal.find(params[:id])
      render json: proposal
   end

   def update
      @proposal = Proposal.find(params[:id])
      authorize @proposal
      @proposal.update!(proposal_params)
      render json: @proposal, status: :accepted
   end

   private

   def proposal_params
      params.permit(:id, :destination_id, :trip_id, :traveler_id)
   end

end
