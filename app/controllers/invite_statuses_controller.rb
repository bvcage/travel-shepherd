class InviteStatusesController < ApplicationController

   def index
      statuses = InviteStatus.all
      render json: statuses
   end
   
end
