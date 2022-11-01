class InvitesController < ApplicationController

   def create
      user = User.find_by(email: params[:user_email])
      if user.nil?
         if not params[:name].nil?
            name = params[:name].split(' ')
            last_name = name.pop
            first_name = name.join(' ')
         else
            first_name = params[:name]
            last_name = nil
         end
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
      elsif params[:user_id]
         user = User.find(params[:user_id])
         invites = user.invites
      else
         invites = Invite.all
      end
      render json: invites
   end

   def update
      invite = Invite.find(params[:id])
      invite.update!(invite_params)
      if invite.invite_status_id == 2
         traveler = Traveler.create!({
            user_id: invite.user_id,
            trip_id: invite.trip_id
         })
         invite.update({traveler_id: traveler.id})
      end
      render json: invite, status: :accepted
   end

   private

   def invite_params
      params.permit(:trip_id, :invite_status_id, :sender_user_id)
   end

end
