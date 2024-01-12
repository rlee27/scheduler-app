class User < ApplicationRecord
    has_one :coach
    has_one :student
end
