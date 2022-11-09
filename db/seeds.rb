
puts "🚜...seeding CATEGORIES:"


puts " 🌱 seeding invite statuses..."

   INVITE_STATUSES = ["pending", "accepted", "rejected"]
   INVITE_STATUSES.each do |status|
      InviteStatus.create(name: status)
   end

puts " 🌱 seeding trip statuses..."

   TRIP_STATUSES = [
      {name: "inviting", code: 100},
      {name: "proposing destinations", code: 200},
      {name: "destination voting", code: 300},
      {name: "proposing activities", code: 400},
      {name: "activities voting", code: 500},
      {name: "planning itinerary", code: 600},
      {name: "in progress", code: 700},
      {name: "complete", code: 800}
   ]
   TRIP_STATUSES.each do |status|
      TripStatus.create!(name: status[:name], code: status[:code])
   end

puts " 🌱 seeding voting types..."

   VOTING_TYPES = {
      "pick": [1],
      "rank": [3]
   }
   VOTING_TYPES.each do |name, values|
      values.each do |value|
         VotingType.create(name: name, value: value)
      end
   end

puts " 🌱 seeding place types..."

   PLACE_TYPES = %w(hotel museum restaurant park other)
   PLACE_TYPES.each do |place|
      PlaceType.create(name: place)
   end

puts " 🌱 seeding activity types..."

   ACTIVITY_TYPES = %w(travel visit dining adventure other)
   ACTIVITY_TYPES.each do |activity|
      ActivityType.create(name: activity)
   end



puts "🚜...seeding DATA:"

   num_users = 10
   num_trips = 10
   num_joins = 30
   num_countries = 40
   num_places = num_countries*3*4


puts " 🌱 seeding users..."

   user1 = User.create(
      username: "test",
      email: "test",
      first_name: "test",
      last_name: "test"
   )
   Login.create(
      user_id: user1.id,
      password: "test"
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

puts " 🌱 seeding trips..."

   num_voting_type = VotingType.all.count
   num_trips.times do
      Trip.create(
         name: Faker::Lorem.word.titleize + ' Group Trip',
         num_days: rand(2..7),
         owner_id: rand(1..num_users),
         voting_type_id: rand(1..num_voting_type),
         trip_status_id: 1
      )
   end

puts " 🌱 seeding travelers (joins)..."

   num_joins.times do
      Traveler.create(
         user_id: rand(1..num_users),
         trip_id: rand(1..num_trips)
      )
   end

   # verify trip owner (user) has traveler record
   Trip.all.each do |trip|
      if not trip.travelers.include? trip.owner_id
         Traveler.create(
            user_id: trip.owner_id,
            trip_id: trip.id
         )
      end
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

puts " 🌱 seeding countries..."

   # aggregate "country" codes
   AGG_CODES = %W(WLD IBT LMY MIC IBD EAR LMC UMC EAS LTE EAP TEA TSA SAS IDA OED HIC PST IDX TSS SSF SSA LDC PRE ECS HPC FCS LIC LCN TLA LAC IDB TEC MEA EUU ARB ECA MNA TMN NAC EMU CEB SST)

   url = "https://countriesnow.space/api/v0.1/countries/population/filter/q?"
   url += "&order=asc"
   url += "&orderBy=populationCounts"
   countries = HTTP.get(url).parse["data"]
   count = 0
   while count < num_countries do
      country = countries.pop
      next if AGG_CODES.include? country["code"]   # skip if not real country
      # correct for name mismatches
      country = country["country"].split(",")[0]
      case country
      when "Russian Federation"
         country = "Russia"
      when "Korea"
         country = "South Korea"
      end
      country = HTTP.get("https://countriesnow.space/api/v0.1/countries/flag/unicode/q?country=" + country.gsub(" ", "%20")).parse["data"]
      Country.create(name: country["name"], iso2: country["iso2"], iso3: country["iso3"], flag: country["unicodeFlag"])
      count += 1
   end

puts " 🌱 seeding destinations..."

   Country.all.each do |country|
      url = "https://countriesnow.space/api/v0.1/countries/population/cities/filter/q?"
      url += "country=" + country["name"].gsub(" ", "%20")
      url += "&limit=3"
      url += "&order=dsc"
      url += "&orderBy=populationCounts"
      cities = HTTP.get(url).parse["data"]
      if cities.kind_of? Array
         cities.each do |city|
            destination = Destination.create(
               municipality: city["city"],
               country_id: country.id,
               description: Faker::Lorem.paragraphs(number: 3).join("\n"),
               summary: Faker::Lorem.sentences(number: 3).join(" ")
            )
            destination.update(name: destination.gen_name)
         end
      else
         destination = Destination.create(
            country_id: country.id,
            description: Faker::Lorem.paragraphs(number: 3).join("\n"),
            summary: Faker::Lorem.sentences(number: 3).join(" ")
         )
         destination.update(name: destination.gen_name)
      end
   end

puts " 🌱 seeding proposals..."

   num_destinations = Destination.all.count
   Trip.all.each do |trip|
      travelers = trip.travelers
      travelers.each do |traveler|
         Proposal.create(
            traveler_id: traveler.id,
            trip_id: trip.id,
            destination_id: rand(1..num_destinations)
         )
      end
   end

puts " 🌱 seeding votes..."

   Traveler.all.each do |traveler|
      next if rand(1..3) == 1
      trip = Trip.find(traveler.trip_id)
      proposals = [*trip.proposals]
      voting_type = VotingType.find_by(id: trip.voting_type_id)
      if voting_type.nil? then voting_type = VotingType.all.sample end
      points = voting_type.value
      voting_type.value.times do
         next if !proposals.any?
         proposal = proposals.sample
         Vote.create(
            proposal_id: proposal.id,
            traveler_id: traveler.id,
            trip_id: trip.id,
            points: points
         )
         traveler.update(has_voted_for_proposal: true)
         proposals.delete(proposal)
         points -= 1 unless voting_type.name == 'pick'
      end
   end

puts " 🌱 seeding places..."

   num_places.times do
      Place.create!(
         name: Faker::Lorem.words(number: 3).join(" "),
         street_number: rand(1..10000),
         street_name: Faker::Address.street_name,
         street_type: Faker::Address.street_suffix,
         destination_id: rand(1..num_destinations),
         place_type_id: rand(1..PLACE_TYPES.length)
      )
   end

puts " 🌱 seeding activities..."

   Place.all.each do |place|
      Activity.create!(
         name: Faker::Lorem.words(number: 2).join(" "),
         description: Faker::Lorem.sentences(number: 3).join(" "),
         destination_id: place.destination_id,
         place_id: place.id,
         activity_type_id: rand(1..ACTIVITY_TYPES.length)
      )
   end

puts " 🌱 seeding events..."

   Activity.all.each do |activity|
      name = "#{activity.activity_type} at #{activity.place.name}"
      Event.create!(
         activity_id: activity.id,
         name: name,
         start_time: Faker::Time.forward(days:14)
      )
   end

puts " 🌱 seeding itineraries..."

   Event.all.each do |event|
      Itinerary.create!(
         event_id: event.id,
         trip_id: rand(1..num_trips)
      )
   end

puts "🌳🌳 done seeding"