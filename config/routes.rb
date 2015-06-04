Rails.application.routes.draw do
  devise_for :users, :controllers => { :registrations => "registrations" }

  root 'addresses#index'

  resources :users do
    resources :addresses
    resources :requests
  end
end
