class CreateVisitors < ActiveRecord::Migration[5.0]
  def change
    create_table :visitors do |t|
      t.string :family_name
      t.string :given_name

      t.timestamps
    end
  end
end
