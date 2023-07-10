class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :book_club
  belongs_to :discussion_question

  validates :comment_text, presence: true
end
