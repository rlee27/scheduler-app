class AddNotNullConstraintToAvailabilities < ActiveRecord::Migration[7.1]
  def change
    change_column :availabilities, :date, :datetime, null:false
  end
end
