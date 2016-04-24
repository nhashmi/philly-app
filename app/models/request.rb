# I would pick a more descriptive name for this model (and associated controller)
# Perhaps something like ServiceRequest...
class Request < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :service_id, scope: :user_id
end
