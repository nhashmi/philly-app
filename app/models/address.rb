class Address < ActiveRecord::Base
  belongs_to :user
  validates :street_address, presence: true

  def self.remove_trailing_period
    self.nil? ? nil : self.chomp(".")
  end


end
