require 'faker'

FactoryGirl.define do 

  factory :user do 
    email { Faker::Internet.email }
    password "password"
    password_confirmation "password"
  end  

  factory :address do 
    street_address "1234 Market St."
    user
  end

end