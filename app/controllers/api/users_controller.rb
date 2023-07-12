class Api::UsersController < ApplicationController
  before_action :authenticate_user!, except: [:create, :index]
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    render json: @users
  end

  # GET /api/v1/users/:username
  def show
    render json: @user
  rescue ActiveRecord::RecordNotFound
    user_not_found
  end

  # POST /api/v1/users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /api/v1/users/:username/reactions
  def reactions
    render json: { reactions: @user.reactions }
  rescue ActiveRecord::RecordNotFound
    user_not_found
  end

  # POST /api/v1/users/:username/profile_picture
  def change_icon
    if @user.update(profile_picture: params[:profile_picture])
      render json: @user
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    user_not_found
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private

  def set_user
    @user = User.find_by(username: params[:username])
    raise ActiveRecord::RecordNotFound if @user.nil?
  end

  def user_not_found
    render json: { error: 'User not found' }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:username, :password, :email, :profile_picture)
  end
end
