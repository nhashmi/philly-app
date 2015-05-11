class Address < ActiveRecord::Base
  belongs_to :user

  # def welcome_message 
  #   if current_user.addresses.length == 0
  #     return "Thanks for signing up! Now add an address below."
  #   else
  #     return "Add an address"
  #   end
  # end

  def self.remove_trailing_period
    self.nil? ? nil : self.chomp(".")
  end


end
