class DestinationExploreSerializer < ActiveModel::Serializer
   attributes :id, :label, :locality, :region, :country, :image_src
end