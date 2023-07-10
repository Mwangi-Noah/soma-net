class DiscussionQuestion < ActiveRecord::Base
  belongs_to :user
  belongs_to :book_club
  has_many :comments

  validates :question, presence: true
end