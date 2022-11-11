class UserPolicy < ApplicationPolicy

   def update?
      @user.id == @record.id
   end

   class Scope < Scope
      # NOTE: Be explicit about which records you allow access to!
      def resolve
        scope.all
      end
   end
end