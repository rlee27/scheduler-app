class EditBookings < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :bookings, :users, column: :coach_id
    add_foreign_key :bookings, :users, column: :student_id
  end
end
