class Reaction < ApplicationRecord
  belongs_to :user
  belongs_to :post

  validates :status, presence: true
end
