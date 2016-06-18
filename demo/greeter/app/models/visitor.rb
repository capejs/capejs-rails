class Visitor < ApplicationRecord
  validates :family_name, :given_name, presence: true
end
