Rails.application.routes.draw do

  devise_for :users
  resourece :user, only: [:edit, :update]
  root "messages#index"
end
