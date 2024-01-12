class Student < ApplicationRecord
  belongs_to :user
  # has_many :bookings
  has_many :bookings, foreign_key: 'student_id'
end
