puts 'Deleting existing data...'
Comment.destroy_all
ClubMembership.destroy_all
ReadingGoal.destroy_all
DiscussionQuestion.destroy_all
BookClub.destroy_all
Notification.destroy_all
User.destroy_all

# Create Users
puts 'Creating users...'
users = [
  { first_name: "John", last_name: "Doe", email: "john@example.com", password: "password", location: "New York" },
  { first_name: "Jane", last_name: "Smith", email: "jane@example.com", password: "password", location: "San Francisco" },
  # Add more user data as needed
]

users.each do |user_data|
  User.create!(user_data)
end

# Create Book Clubs
puts 'Creating book clubs...'
book_clubs = [
  { name: "Sci-Fi Book Club", creator_id: User.first.id, book_title: "Dune", discussion_duration: 7 },
  { name: "Mystery Book Club", creator_id: User.last.id, book_title: "Gone Girl", discussion_duration: 14 },
  # Add more book club data as needed
]

book_clubs.each do |book_club_data|
  BookClub.create!(book_club_data)
end

# Create Club Memberships
puts 'Creating club memberships...'
club_memberships = [
  { user_id: User.first.id, book_club_id: BookClub.first.id },
  { user_id: User.last.id, book_club_id: BookClub.last.id },
  # Add more club membership data as needed
]

club_memberships.each do |club_membership_data|
  ClubMembership.create!(club_membership_data)
end

# Create Reading Goals
puts 'Creating reading goals...'
reading_goals = [
  { user_id: User.first.id, book_club_id: BookClub.first.id, target_pages: 100, deadline: Date.today + 7 },
  { user_id: User.first.id, book_club_id: BookClub.last.id, target_pages: 50, deadline: Date.today + 14 },
  # Add more reading goal data as needed
]

reading_goals.each do |reading_goal_data|
  ReadingGoal.create!(reading_goal_data)
end

# Create Discussion Questions
puts 'Creating discussion questions...'
discussion_questions = [
  { user_id: User.first.id, book_club_id: BookClub.first.id, question: "What do you think about the main character's decision?" },
  { user_id: User.last.id, book_club_id: BookClub.last.id, question: "Who do you think is the culprit?" },
  # Add more discussion question data as needed
]

discussion_questions.each do |discussion_question_data|
  DiscussionQuestion.create!(discussion_question_data)
end

# Create Comments
puts 'Creating comments...'
comments = [
  { user_id: User.first.id, book_club_id: BookClub.first.id, discussion_question_id: DiscussionQuestion.first.id, comment_text: "I really enjoyed the book. The characters were well-developed." },
  { user_id: User.last.id, book_club_id: BookClub.last.id, discussion_question_id: DiscussionQuestion.last.id, comment_text: "I think the twist at the end was unexpected." },
  # Add more comment data as needed
]

comments.each do |comment_data|
  Comment.create!(comment_data)
end

# Create Notifications
puts 'Creating notifications...'
notifications = [
  { user_id: User.first.id, message: "Upcoming book club discussion: Sci-Fi Book Club" },
  { user_id: User.last.id, message: "New comment on the Mystery Book Club discussion" },
  # Add more notification data as needed
]

notifications.each do |notification_data|
  Notification.create!(notification_data)
end

puts 'Seeding completed!'