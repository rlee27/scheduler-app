class Availability < ApplicationRecord
  belongs_to :coach
  validates :date, presence: true
end
