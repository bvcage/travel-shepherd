class CreateLogins < ActiveRecord::Migration[7.0]
  def change
    create_table :logins do |t|
      t.integer :user_id
      t.string :password_digest

      t.timestamps
    end
  end
end
