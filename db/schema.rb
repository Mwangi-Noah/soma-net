# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_07_11_072026) do

  create_table "book_clubs", force: :cascade do |t|
    t.string "name"
    t.integer "creator_id"
    t.string "book_title"
    t.integer "discussion_duration"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_book_clubs_on_creator_id"
  end

  create_table "books", force: :cascade do |t|
    t.string "title"
    t.string "author"
    t.string "genre"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "club_memberships", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "book_club_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_club_memberships_on_book_club_id"
    t.index ["user_id"], name: "index_club_memberships_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "book_club_id", null: false
    t.integer "discussion_question_id", null: false
    t.text "comment_text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_comments_on_book_club_id"
    t.index ["discussion_question_id"], name: "index_comments_on_discussion_question_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "discussion_questions", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "book_club_id", null: false
    t.text "question"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_discussion_questions_on_book_club_id"
    t.index ["user_id"], name: "index_discussion_questions_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "user_id", null: false
    t.text "message"
    t.datetime "timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.integer "upvotes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "reactions", force: :cascade do |t|
    t.string "status"
    t.integer "user_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["post_id"], name: "index_reactions_on_post_id"
    t.index ["user_id"], name: "index_reactions_on_user_id"
  end

  create_table "reading_goals", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "book_club_id", null: false
    t.integer "target_pages"
    t.date "deadline"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_reading_goals_on_book_club_id"
    t.index ["user_id"], name: "index_reading_goals_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "book_id", null: false
    t.integer "rating"
    t.text "review_text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_id"], name: "index_reviews_on_book_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "profile_picture"
    t.string "interests"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "last_name"
    t.string "email"
    t.string "password"
    t.string "location"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "username"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "book_clubs", "users", column: "creator_id"
  add_foreign_key "club_memberships", "book_clubs"
  add_foreign_key "club_memberships", "users"
  add_foreign_key "comments", "book_clubs"
  add_foreign_key "comments", "discussion_questions"
  add_foreign_key "comments", "users"
  add_foreign_key "discussion_questions", "book_clubs"
  add_foreign_key "discussion_questions", "users"
  add_foreign_key "notifications", "users"
  add_foreign_key "reactions", "posts"
  add_foreign_key "reactions", "users"
  add_foreign_key "reading_goals", "book_clubs"
  add_foreign_key "reading_goals", "users"
  add_foreign_key "reviews", "books"
  add_foreign_key "reviews", "users"
end
