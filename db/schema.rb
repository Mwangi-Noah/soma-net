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

ActiveRecord::Schema.define(version: 2023_07_10_045228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "book_clubs", force: :cascade do |t|
    t.string "name"
    t.bigint "creator_id"
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
    t.bigint "user_id", null: false
    t.bigint "book_club_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_club_memberships_on_book_club_id"
    t.index ["user_id"], name: "index_club_memberships_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "book_club_id", null: false
    t.bigint "discussion_question_id", null: false
    t.text "comment_text"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_comments_on_book_club_id"
    t.index ["discussion_question_id"], name: "index_comments_on_discussion_question_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "discussion_questions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "book_club_id", null: false
    t.text "question"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_discussion_questions_on_book_club_id"
    t.index ["user_id"], name: "index_discussion_questions_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "message"
    t.datetime "timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "reading_goals", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "book_club_id", null: false
    t.integer "target_pages"
    t.date "deadline"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["book_club_id"], name: "index_reading_goals_on_book_club_id"
    t.index ["user_id"], name: "index_reading_goals_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "book_id", null: false
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
  add_foreign_key "reading_goals", "book_clubs"
  add_foreign_key "reading_goals", "users"
  add_foreign_key "reviews", "books"
  add_foreign_key "reviews", "users"
end
