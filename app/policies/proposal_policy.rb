class ProposalPolicy < ApplicationPolicy

   def destroy?
      @user.id == @record.user.id
   end

   def update?
      @user.id == @record.user.id
   end

   class Scope < Scope
      # NOTE: Be explicit about which records you allow access to!
      def resolve
        scope.all
      end
   end
end
