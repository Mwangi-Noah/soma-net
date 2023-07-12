class Api::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token

  # POST /api/login
  def create
    user = User.find_by(email: params[:username][:email])
    if user&.valid_password?(params[:username][:password])
      sign_in(user)
      set_login_cookie(user)
      render json: { message: 'Logged in successfully.' }
    else
      render json: { message: 'Invalid email or password.' }, status: :unprocessable_entity
    end
  end

  # DELETE /api/logout
  def destroy
    sign_out(current_user)
    remove_login_cookie
    render json: { message: 'Logged out successfully.' }
  end

  private

  def set_login_cookie(user)
    cookies[:user_id] = {
      value: user.id,
      expires: 1.week.from_now, # Set the expiration time as desired
      secure: Rails.env.production? # Set 'secure' to true in production
    }
  end

  def remove_login_cookie
    cookies.delete(:user_id)
  end
end