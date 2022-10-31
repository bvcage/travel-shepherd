Rails.application.routes.draw do

   get '/auth', to: 'users#auth'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'
   post '/signup', to: 'users#create'
   get '/username_exist', to: 'users#exist'

   resources :logins, only: [:index]
   # resources :travelers, only: [:index]
   resources :trips, only: [:index, :create] do
      resources :users, only: [:index]
   end
   resources :users, only: [:show, :create, :update] do
      resources :trips, only: [:index]
   end

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
