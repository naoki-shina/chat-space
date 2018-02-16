Rails.application.routes.draw do
  devise_for :users
  resource :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  root "groups#index"

end
