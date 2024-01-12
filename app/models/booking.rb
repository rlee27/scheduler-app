class Booking < ApplicationRecord
  belongs_to :coach
  belongs_to :student
  has_one :review
end
