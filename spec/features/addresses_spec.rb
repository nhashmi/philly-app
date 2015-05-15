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

  it "shows the new address form when the user clicks 'add a new address' button" do 
    visit "/"
    login_as(@user)
    click_link("Add another address")
    expect(page).to have_content('Unit')
  end 

  it "includes the new address after a user submits the 'Create Address' form" do 
    visit "/"
    login_as(@user)
    click_link("Add another address")
    fill_in('address[street_address]', :with => '2000 Spring Garden St.')
    fill_in('address[unit]', :with => '100')
    click_button('Create Address')
    expect(page).to have_content('2000 Spring Garden St.')
  end

end