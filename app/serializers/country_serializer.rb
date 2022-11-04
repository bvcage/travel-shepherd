class CountrySerializer < ActiveModel::Serializer
  attributes :id, :name, :iso2, :iso3, :flag
end
