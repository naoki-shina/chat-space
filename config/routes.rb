Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  root "groups#index"

end
