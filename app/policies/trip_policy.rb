class TripPolicy < ApplicationPolicy

   def destroy?
      @user.id == @record.owner_id
   end

   def update?
      @user.id == @record.owner_id
   end

   class Scope < Scope
      # NOTE: Be explicit about which records you allow access to!
      def resolve
        scope.all
      end
   end
end
