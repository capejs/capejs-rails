Rails.application.routes.draw do
  root 'top#index'

  namespace :api do
    resources :visitors, only: [ :index, :create ]
  end
end
