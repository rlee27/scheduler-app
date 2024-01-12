class Coach < ApplicationRecord
  belongs_to :user
  # has_many :bookings, through: :user
  has_many :availabilities
  has_many :bookings, foreign_key: 'coach_id'
  has_many :reviews, through: :bookings
end
