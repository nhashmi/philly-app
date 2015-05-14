require 'rails_helper'

include Warden::Test::Helpers
Warden.test_mode!

describe "Addresses", js: true do

  before(:each) do
    @user = FactoryGirl.create(:user)
    login_as(@user, :scope => :user)   
    Address.destroy_all
    @user.addresses.create!(street_address: "1234 Market St.", unit: "")
    @user.addresses.create!(street_address: "2000 Market St.", unit: "")
    @user.addresses.create!(street_address: "3000 Market St.", unit: "101")
  end

  it "shows all of the user's addresses" do 
    visit "/"
    login_as(@user)
    Address.all.each do |address|
      expect(page).to have_content(address.street_address)
    end
  end

  # Clicking add a new address shows address form 
  it "shows the new address form when the user clicks 'add a new address' button" do 
    visit "/"
    login_as(@user)
    click_link("Add another address")
    fill_in('street_address', :with => '2000 Spring Garden St.')
    fill_in('unit', :with => '100')
    click_button('Submit')
    expect(page).to have_content('2000 Spring Garden St.')
  end 

  # Creating a new address takes user back to addresses#index and 
  # includes new address 


  # Clicking track request creates a new request that belongs to the user 


  # Clicking sign out takes the user to the sign in page




end