class CreateAvailabilities < ActiveRecord::Migration[7.1]
  def change
    create_table :availabilities do |t|
      t.references :coach, null: false, foreign_key: true
      t.datetime :date

      t.timestamps
    end
  end
end
