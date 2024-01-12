class RemoveCoachAndStudentColumnsFromReviews < ActiveRecord::Migration[7.1]
  def change
    remove_foreign_key :reviews, column: :coach_id
    remove_foreign_key :reviews, column: :student_id
  end
end
