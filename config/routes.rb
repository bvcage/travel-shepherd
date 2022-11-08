Rails.application.routes.draw do

   get '/auth', to: 'users#auth'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'
   post '/signup', to: 'users#create'
   get '/users/exist', to: 'users#exist'

   resources :countries, only: [:index] do
      resources :destinations, only: [:index]
   end
   resources :destinations, only: [:index, :show, :create] do
      resources :activities, only: [:index]
   end
   resources :invite_statuses, only: [:index]
   resources :invites, only: [:create, :update]
   resources :logins, only: [:index]
   resources :proposals, only: [:show, :create, :update, :destroy]
   resources :proposed_itineraries, only: [:create]
   resources :travelers, only: [:index]
   resources :trips, only: [:index, :show, :create, :update, :destroy] do
      get 'calc_results', to: 'calc_results'
      get 'itinerary', to: 'events#index'
      resources :activities, only: [:index]
      resources :invites, only: [:index]
      resources :proposals, only: [:index]
      resources :travelers, only: [:index]
      resources :votes, only: [:index]
   end
   resources :users, only: [:show, :create, :update] do
      resources :invites, only: [:index]
      resources :trips, only: [:index]
   end
   resources :votes, only: [:create]

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
