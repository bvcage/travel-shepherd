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

ActiveRecord::Schema[7.0].define(version: 2022_11_16_203453) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer "destination_id"
    t.integer "place_id"
    t.integer "activity_type_id"
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_src"
  end

  create_table "activity_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "activity_votes", force: :cascade do |t|
    t.integer "proposal_id"
    t.integer "traveler_id"
    t.integer "trip_id"
    t.integer "activity_id"
    t.integer "points"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries", force: :cascade do |t|
    t.string "name"
    t.string "iso2", limit: 2
    t.string "iso3", limit: 3
    t.string "flag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "destinations", force: :cascade do |t|
    t.string "locality"
    t.string "region"
    t.string "postal_area"
    t.integer "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "summary"
    t.text "description"
    t.string "label"
    t.float "lat"
    t.float "lon"
    t.string "region_code"
    t.string "google_id"
    t.string "image_src"
  end

  create_table "events", force: :cascade do |t|
    t.integer "activity_id"
    t.string "name"
    t.datetime "start_time", precision: nil
    t.datetime "end_time", precision: nil
    t.integer "duration_in_minutes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invite_statuses", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "invites", force: :cascade do |t|
    t.integer "trip_id"
    t.integer "user_id"
    t.integer "invite_status_id"
    t.integer "sender_user_id"
    t.integer "traveler_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "itineraries", force: :cascade do |t|
    t.integer "event_id"
    t.integer "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "logins", force: :cascade do |t|
    t.integer "user_id"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "place_types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "places", force: :cascade do |t|
    t.string "name"
    t.integer "place_type_id"
    t.string "street_number"
    t.string "building_name"
    t.string "street_number_suffix"
    t.string "street_name"
    t.string "street_type"
    t.string "street_direction"
    t.string "address_type"
    t.string "address_type_identifier"
    t.integer "destination_id"
    t.string "google_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_src"
  end

  create_table "proposals", force: :cascade do |t|
    t.integer "traveler_id"
    t.integer "destination_id"
    t.integer "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "proposed_itineraries", force: :cascade do |t|
    t.integer "activity_id"
    t.integer "proposal_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "travelers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "trip_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "has_voted_for_proposal"
    t.boolean "has_voted_for_activities"
  end

  create_table "trip_statuses", force: :cascade do |t|
    t.string "name"
    t.integer "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips", force: :cascade do |t|
    t.string "name"
    t.integer "num_days"
    t.datetime "start_date", precision: nil
    t.datetime "end_date", precision: nil
    t.datetime "proposal_voting_closes_at", precision: nil
    t.boolean "allow_proposals"
    t.integer "voting_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "owner_id"
    t.datetime "proposal_voting_opens_at"
    t.boolean "proposal_voting_is_open?"
    t.integer "winning_proposal_id"
    t.boolean "activity_voting_is_open?"
    t.datetime "activity_voting_opens_at", precision: nil
    t.datetime "activity_voting_closes_at", precision: nil
    t.integer "trip_status_id"
    t.index ["owner_id"], name: "index_trips_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.string "photo_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "has_signed_up"
    t.string "middle_name"
    t.string "last_destination_visited"
  end

  create_table "votes", force: :cascade do |t|
    t.integer "proposal_id"
    t.integer "traveler_id"
    t.integer "trip_id"
    t.integer "points"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "voting_types", force: :cascade do |t|
    t.string "name"
    t.integer "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
