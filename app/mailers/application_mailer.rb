class ApplicationMailer < ActionMailer::Base
   default from: "Travel Shepherd <#{ENV["GMAIL_USERNAME"]}>"
   layout "mailer"
end
