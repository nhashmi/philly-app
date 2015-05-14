require 'rails_helper'

RSpec.describe Address, type: :model do
  context "with no unit" do 
    it "should have a street address" do
      @address = Address.create(street_address: "1300 Market St.", unit: "")
      @address.street_address.should eq("1300 Market St.")
    end
    it "should not have a unit" do 
      @address = Address.create(street_address: "1300 Market St.", unit: "")
      @address.unit.should eq("")
    end
  end

  context "with a unit" do 
    it "should have a street address and a unit" do 
      @address = Address.create(street_address: "1000 Broad St.", unit: "101")
      @address.street_address.should eq("1000 Broad St.")
      @address.unit.should eq("101")
    end
  end
end
