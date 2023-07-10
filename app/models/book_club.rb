class BookClub < ActiveRecord::Base
  belongs_to :creator, class_name: 'User'
  has_many :club_memberships
  has_many :users, through: :club_memberships
  has_many :reading_goals
  has_many :discussion_questions
  has_many :comments, through: :discussion_questions

  validates :name, presence: true
  validates :book_title, presence: true
  validates :discussion_duration, numericality: { greater_than: 0 }

  def active_reading_goals
    reading_goals.where('deadline >= ?', Date.today)
  end
end