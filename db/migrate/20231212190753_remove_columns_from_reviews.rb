class RemoveColumnsFromReviews < ActiveRecord::Migration[7.1]
  def change
    if foreign_key_exists?(:reviews, :coach_id)
      remove_foreign_key :reviews, column: "coach_id"
    end

    if foreign_key_exists?(:reviews, :student_id)
      remove_foreign_key :reviews, column: "student_id"
    end

    remove_column :reviews, :coach_id, :integer
    remove_column :reviews, :student_id, :integer
  end
end
