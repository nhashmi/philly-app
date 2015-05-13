class Requests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.belongs_to :user
      t.string :service_id, :null => false
      t.text :notes
      t.timestamps null: false 
    end
  end
end
