class CreateBookClubs < ActiveRecord::Migration[6.1]
  def change
    create_table :book_clubs do |t|
      t.string :name
      t.references :creator, foreign_key: { to_table: :users }
      t.string :book_title
      t.integer :discussion_duration

      t.timestamps
    end
  end
end
