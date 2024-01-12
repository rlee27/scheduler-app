class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.references :booking, null: false, foreign_key: true
      t.references :coach, null: false, foreign_key: true
      t.references :student, null: false, foreign_key: true
      t.integer :rating
      t.text :feedback

      t.timestamps
    end
  end
end
