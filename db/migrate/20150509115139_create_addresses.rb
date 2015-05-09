class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.belongs_to :user
      t.string :street_address, :null => false
      t.timestamps null: false
    end
  end
end
