class RemoveStudentIdAndCoachIdFromReviews < ActiveRecord::Migration[7.1]
  def change
    remove_reference :reviews, :coach_id, null: false
    remove_reference :reviews, :student_id, null: false
  end
end
