Rails.application.routes.draw do

   get '/auth', to: 'users#show'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'
   post '/signup', to: 'users#create'

   resources :logins, only: [:index]
   resources :users, only: [:index, :show, :create]

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
