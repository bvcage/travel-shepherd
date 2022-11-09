class TripsController < ApplicationController

   def calc_results
      @trip = Trip.find(params[:trip_id])
      authorize @trip, :update?
      winning_proposal = @trip.calc_voting_results
      render json: winning_proposal
   end

   def create
      if params[:owner_id].nil?
         owner_id = params[:user_id]
      else
         owner_id = params[:owner_id]
      end
      voting_type = VotingType.find_by(name: params['voting_type_name'], value: params['voting_type_value'])
      trip = Trip.create!(**trip_params,
         owner_id: owner_id,
         voting_type_id: voting_type.id
      )
      Traveler.create!(
         trip_id: trip.id,
         user_id: params[:owner_id]
      )
      render json: trip, status: :created
   end

   def destroy
      @trip = Trip.find(params[:id])
      authorize @trip
      @trip.destroy
      head :no_content
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

   def show
      trip = Trip.find(params[:id])
      render json: trip
   end

   def update
      @trip = Trip.find(params[:id])
      authorize @trip
      @trip.update!(trip_params)
      if params[:voting_type]
         voting_type = VotingType.find_by!(name: params[:voting_type]['name'], value: params[:voting_type]['value'])
         @trip.update!(voting_type_id: voting_type.id)
      end
      render json: @trip, status: :accepted
   end

   private

   def trip_params
      params.permit(
         :name,
         :owner_id,
         :start_date,
         :end_date,
         :proposal_voting_opens_at,
         :proposal_voting_closes_at,
         :proposal_voting_is_open?,
         :activity_voting_opens_at,
         :activity_voting_closes_at,
         :activity_voting_is_open?,
         :num_days,
         :allow_proposals,
         :voting_type_id
      )
   end

end
