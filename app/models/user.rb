class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
    class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
        has_many :club_memberships
        has_many :book_clubs, through: :club_memberships
  
        has_many :posts
        has_many :comments
        has_many :reactions
      
        validates :username, presence: true
        validates :email, presence: true, uniqueness: true
        validates :password, presence: true
      
        def full_name
          "#{first_name} #{last_name}"
        end
    end
end
