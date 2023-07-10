class User < ApplicationRecord
    class User < ActiveRecord::Base
        has_many :club_memberships
        has_many :book_clubs, through: :club_memberships
      
        validates :name, presence: true
        validates :email, presence: true, uniqueness: true
        validates :password, presence: true
      
        def full_name
          "#{first_name} #{last_name}"
        end
    end
end
