class InvitesController < ApplicationController

   def create
      user = User.find_by(email: params[:user_email])
      if user.nil?
         name = params[:name].split
         last_name = name.pop
         first_name = name.join(' ')
         user = User.new({
            email: params[:user_email],
            first_name: first_name,
            last_name: last_name
         })
         user.save(validate: false)
      end
      pp user
      invite = Invite.create!({
         user_id: user.id,
         **invite_params
      })
      render json: invite, status: :created
   end

   def index
      if params[:trip_id]
         trip = Trip.find(params[:trip_id])
         invites = trip.invites
      else
         invites = Invite.all
      end
      render json: invites
   end

   private

   def invite_params
      params.permit(:trip_id, :invite_status_id)
   end

end
