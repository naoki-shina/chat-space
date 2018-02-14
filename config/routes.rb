Rails.application.routes.draw do
  devise_for :users
  resource :users, only: [:edit, :update]
  resource :groups, only: [:new, :create, :edit, :update] do
    resource :messages, only: [:index, :create]
  end
  root "messages#index"
end
