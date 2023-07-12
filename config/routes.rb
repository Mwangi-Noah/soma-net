Rails.application.routes.draw do
  namespace :api do
    devise_for :users, controllers: { sessions: 'api/sessions' }

    # Routes for the API controllers

    resources :users, only: [:index, :create, :update, :destroy]
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    get '/users/:username/reactions', to: 'users#reactions'
    get '/users/:username', to: 'users#show'
    post '/users/:username/profile_picture', to: 'users#change_icon'

    # Routes for the SessionsController
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'

    
  end

  # Fallback route for handling non-API requests
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end