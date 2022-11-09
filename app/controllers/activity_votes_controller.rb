class ActivityVotesController < ApplicationController

   def create
      # get traveler_id if only user_id provided
      if params[:traveler_id].nil?
         user = User.find(params[:user_id])
         trip = Trip.find(params[:trip_id])
         traveler = Traveler.find_by!(user_id: user.id, trip_id: trip.id)
         traveler_id = traveler.id
      else
         traveler_id = params[:traveler_id]
      end
      # calculate points if only ranking provided
      if params[:points].nil?
         points = ActivityVote.gen_points(params[:rank])
      else
         points = params[:points]
      end
      # create record
      vote = ActivityVote.create!(**vote_params,
         traveler_id: traveler_id,
         points: points
      )
      Traveler.find(traveler_id).update!(has_voted_for_activities: true)
      render json: vote, status: :created
   end

   private

   def vote_params
      params.permit(:trip_id, :traveler_id, :activity_id, :points)
   end

end
