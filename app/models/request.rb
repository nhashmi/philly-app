class Request < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :service_id, scope: :user_id
end