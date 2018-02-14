Rails.application.routes.draw do
  devise_for :users
  resource :user, only: [:edit, :update]
  resource :group, only: [:new, :create, :edit, :update]
  root "messages#index"
end
