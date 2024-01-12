class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.references :coach, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.datetime :date, null: false

      t.timestamps
    end
  end
end
