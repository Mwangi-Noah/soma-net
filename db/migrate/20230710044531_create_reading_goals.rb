class CreateReadingGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :reading_goals do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book_club, null: false, foreign_key: true
      t.integer :target_pages
      t.date :deadline

      t.timestamps
    end
  end
end
