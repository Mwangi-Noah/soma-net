class CreateDiscussionQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :discussion_questions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :book_club, null: false, foreign_key: true
      t.text :question

      t.timestamps
    end
  end
end
