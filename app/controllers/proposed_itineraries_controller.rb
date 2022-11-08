class ProposedItinerariesController < ApplicationController

   def create
      pi = ProposedItinerary.create!(pi_params)
      render json: pi, status: :created
   end

   private

   def pi_params
      params.permit(:proposal_id, :activity_id)
   end

end
