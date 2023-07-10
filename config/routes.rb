Rails.application.routes.draw do
  namespace :api do
    devise_for :users, controllers: { sessions: 'api/sessions' }

    # Other routes for the API controllers
    resources :users, only: [:index, :destroy, :update]
    post "/signup", to: "users#create"
    get "/me", to: "users#show"

    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    # Add routes for other controllers as per your requirements
    resources :book_clubs, only: [:index, :show, :create, :update, :destroy]
    resources :club_memberships, only: [:index, :show, :create, :destroy]
    resources :reading_goals, only: [:index, :show, :create, :update, :destroy]
    resources :books, only: [:index, :show, :create, :update, :destroy]
    resources :reviews, only: [:index, :show, :create, :update, :destroy]
    resources :discussion_questions, only: [:index, :show, :create, :update, :destroy]
    resources :comments, only: [:index, :show, :create, :update, :destroy]
    resources :notifications, only: [:index, :show, :create, :update, :destroy]
  end

  # Fallback route for handling non-API requests
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end