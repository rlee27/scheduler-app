class Review < ApplicationRecord
  # belongs_to :coach
  belongs_to :booking
  # has_one :student, through: :booking
  # has_one :coach, through: :booking
  has_one :student, through: :booking
end
