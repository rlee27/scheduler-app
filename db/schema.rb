# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_02_212541) do
  create_table "availabilities", force: :cascade do |t|
    t.integer "coach_id", null: false
    t.datetime "date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["coach_id"], name: "index_availabilities_on_coach_id"
  end

  create_table "bookings", force: :cascade do |t|
    t.integer "coach_id", null: false
    t.integer "student_id", null: false
    t.datetime "date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "review_written", default: false, null: false
    t.index ["coach_id"], name: "index_bookings_on_coach_id"
    t.index ["student_id"], name: "index_bookings_on_student_id"
  end

  create_table "coaches", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_coaches_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "booking_id", null: false
    t.integer "rating"
    t.text "feedback"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id"], name: "index_reviews_on_booking_id"
  end

  create_table "students", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_students_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "role", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "availabilities", "coaches"
  add_foreign_key "bookings", "coaches"
  add_foreign_key "bookings", "students"
  add_foreign_key "bookings", "users", column: "coach_id"
  add_foreign_key "bookings", "users", column: "student_id"
  add_foreign_key "coaches", "users"
  add_foreign_key "reviews", "bookings"
  add_foreign_key "students", "users"
end
