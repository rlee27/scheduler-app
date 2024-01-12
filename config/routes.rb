Rails.application.routes.draw do
  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  namespace :api do
    namespace :v1 do
      resources :coaches, only: [:index, :show] do
        resources :bookings, only: [:index, :create]
        resources :availabilities, only: [:index, :create]
        resources :reviews, only: [:index]
        get 'reviews_and_needs_reviews', on: :member, to: 'coaches#reviews_and_needs_reviews'
      end

      resources :students, only: [:index, :show]
      resources :bookings, only: [:show]
      resources :reviews, only: [:create]
      resources :availabilities, only: [:show, :create]
    end
  end

  get '*path', to: 'home#default', via: :all
end
