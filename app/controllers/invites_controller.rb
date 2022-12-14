class InvitesController < ApplicationController

   def create
      @user = User.find_by(email: params[:user_email])
      if @user.nil?
         # if no user, create one with temp login
         @user = User.setup_shell_user(params)
         # send invite email
         # @sender = User.find(params[:sender_user_id])
         # UserMailer.with(user: @user, sender: @sender).invite_email.deliver_now
      end
      invite = Invite.create!({
         user_id: @user.id,
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
