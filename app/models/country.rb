class Country < ApplicationRecord
   has_many :destinations

   after_create do |country|
      if country.flag.nil?
         url = "https://countriesnow.space/api/v0.1/countries/flag/unicode/q?"
         url += "country=" + country.name.gsub(" ", "%20")
         data = HTTP.get(url).parse["data"]
         country.update!(
            iso2: data["iso2"],
            iso3: data["iso3"],
            flag: data["unicodeFlag"]
         )
      end
   end
end
