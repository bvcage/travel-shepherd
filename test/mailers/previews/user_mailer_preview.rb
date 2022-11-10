class UserMailerPreview < ActionMailer::Preview

   def invite_email
      UserMailer.with({
         user: User.all.sample,
         sender: User.all.sample
      }).invite_email
   end

end