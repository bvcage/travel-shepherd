class TripSerializer < ActiveModel::Serializer
  attributes :id, :name, :num_days, :start_date, :end_date, :voting_deadline
  has_many :travelers
  has_many :invites
end
