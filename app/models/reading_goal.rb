class ReadingGoal < ActiveRecord::Base
  belongs_to :user
  belongs_to :book_club

  validates :target_pages, numericality: { greater_than: 0 }
  validates :deadline, presence: true

  scope :completed, -> { where('deadline < ?', Date.today) }
end