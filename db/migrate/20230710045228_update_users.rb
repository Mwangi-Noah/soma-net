class UpdateUsers < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.rename :name, :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.string :location
    end
  end
end