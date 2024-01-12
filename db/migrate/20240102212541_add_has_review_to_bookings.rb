class AddHasReviewToBookings < ActiveRecord::Migration[7.1]
  def change
    add_column :bookings, :review_written, :boolean, default: false, null: false
  end
end
