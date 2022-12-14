class UserMailer < ApplicationMailer

   def invite_email
      @user = params[:user]
      @sender = params[:sender]
      @temp_pass = params[:temp_pass]
      email_with_name = "#{@user.full_name} <#{@user.email}>"
      mail(to: email_with_name, subject: "Invite to plan trip with Travel Shepherd")
   end

end
