Rails.application.routes.draw do
  resources :voting_types

   get '/auth', to: 'users#auth'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'
   post '/signup', to: 'users#create'
   get '/users/exist', to: 'users#exist'

   resources :invite_statuses, only: [:index]
   resources :invites, only: [:create, :update]
   resources :logins, only: [:index]
   # resources :travelers, only: [:index]
   resources :trips, only: [:index, :show, :create, :update, :destroy] do
      resources :invites, only: [:index]
      resources :travelers, only: [:index]
   end
   resources :users, only: [:show, :create, :update] do
      resources :invites, only: [:index]
      resources :trips, only: [:index]
   end

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
