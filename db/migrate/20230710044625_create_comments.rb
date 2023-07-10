class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book_club, null: false, foreign_key: true
      t.references :discussion_question, null: false, foreign_key: true
      t.text :comment_text

      t.timestamps
    end
  end
end
