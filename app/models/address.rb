class Address < ActiveRecord::Base
  belongs_to :user
  validates :street_address, presence: true

  def self.remove_trailing_period
    # you could shorten this to self.try(:chomp, ".")
    # since you're getting ruby pretty well, I'd recommend 'Confident Ruby' by
    # Avdi Grim. It talks a lot about writing code that doesn't have to guard
    # against nil.
    self.nil? ? nil : self.chomp(".")
  end


end
