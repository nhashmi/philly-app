require 'rails_helper'

RSpec.describe AddressesController, type: :controller do
  login_user
  let(:user) { FactoryGirl.create(:user) }
  let(:address) { FactoryGirl.create(:address, user: user)}
 
  it "should have a current user" do 
    expect(subject.current_user).not_to be_nil
  end

  it "should have an address that is a string" do 
    expect(address.street_address).to include("Market")
  end



end
