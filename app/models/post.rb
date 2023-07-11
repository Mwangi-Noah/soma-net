class Post < ApplicationRecord
    belongs_to :user
    has_many :comments
    has_many :reactions
  
    validates :title, presence: true
    validates :body, presence: true
end
