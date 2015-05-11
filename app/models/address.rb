class Address < ActiveRecord::Base
  belongs_to :user

  def self.remove_trailing_period
    self.nil? ? nil : self.chomp(".")
  end


end
