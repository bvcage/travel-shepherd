Rails.application.routes.draw do

   get '/auth', to: 'users#auth'
   post '/login', to: 'sessions#create'
   delete '/logout', to: 'sessions#destroy'
   post '/signup', to: 'users#create'
   get '/users/exist', to: 'users#exist'

   resources :countries, only: [:index] do
      resources :destinations, only: [:index]
   end
   resources :destinations, only: [:index, :show]
   resources :invite_statuses, only: [:index]
   resources :invites, only: [:create, :update]
   resources :logins, only: [:index]
   resources :proposals, only: [:show, :create, :update, :destroy]
   # resources :travelers, only: [:index]
   resources :trips, only: [:index, :show, :create, :update, :destroy] do
      get 'calc_results', to: 'calc_results'
      resources :invites, only: [:index]
      resources :proposals, only: [:index]
      resources :travelers, only: [:index]
      resources :votes, only: [:index]
   end
   resources :users, only: [:show, :create, :update] do
      resources :invites, only: [:index]
      resources :trips, only: [:index]
   end
   # resouces :votes

   get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
