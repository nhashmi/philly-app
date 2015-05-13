require 'rails_helper'

describe "Addresses", js: true do

  before(:each) do 
    Address.destroy_all
    Address.create!(street_address: "1234 Market St.", unit: "")
    Address.create!(street_address: "2000 Market St.", unit: "")
    Address.create!(street_address: "3000 Market St.", unit: "")
  end

  it "shows all of the user's addresses" do 
    visit "/"
    Address.all.each do |address|
      expect(page).to have_content(address.street_address)
    end
  end

end