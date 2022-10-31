# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "seeding data..."

num_users = 10
num_trips = 10
num_joins = 30

puts "seeding users..."

user1 = User.create(
   username: "a",
   email: "a",
   first_name: "a",
   last_name: "a"
)
Login.create(
   user_id: user1.id,
   password: "a"
)

num_users.times do
   first_name = Faker::Name.first_name
   last_name = Faker::Name.last_name
   user = User.create(
      first_name: first_name,
      last_name: last_name,
      email: Faker::Internet.safe_email(name: first_name),
      username: Faker::Internet.username(specifier: "#{first_name} #{last_name}", separators: %w(. _ -)),
      photo_url: Faker::Avatar.image
   )
   Login.create(
      user_id: user.id,
      password: "pass"
   )
end

puts "seeding trips..."

num_trips.times do
   Trip.create(
      name: Faker::Address.country,
      num_days: rand(2..7)
   )
end

puts "seeding travelers (joins)..."

num_joins.times do
   Traveler.create(
      user_id: rand(1..num_users),
      trip_id: rand(1..num_trips)
   )
end

# verify all users have at least 1 trip
User.all.each do |user|
   if user.trips.length == 0
      Traveler.create(
         user_id: user.id,
         trip_id: rand(1..num_trips)
      )
   end
end

# verify all trips have at least 1 user
Trip.all.each do |trip|
   if trip.users.length == 0
      Traveler.create(
         user_id: rand(1..num_users),
         trip_id: trip.id
      )
   end
end

puts "done seeding data"