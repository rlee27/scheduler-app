class CreateCoaches < ActiveRecord::Migration[7.1]
  def change
    create_table :coaches do |t|
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
