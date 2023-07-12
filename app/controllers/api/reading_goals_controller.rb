class Api::ReadingGoalsController < ApplicationController
    before_action :set_reading_goal, only: [:show, :update, :destroy]
  
    def index
      @reading_goals = ReadingGoal.all
      render json: @reading_goals
    end
  
    def show
      render json: @reading_goal
    end
  
    def create
      @reading_goal = ReadingGoal.new(reading_goal_params)
      if @reading_goal.save
        render json: @reading_goal, status: :created
      else
        render json: @reading_goal.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @reading_goal.update(reading_goal_params)
        render json: @reading_goal
      else
        render json: @reading_goal.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @reading_goal.destroy
      head :no_content
    end
  
    private
  
    def set_reading_goal
      @reading_goal = ReadingGoal.find(params[:id])
    end
  
    def reading_goal_params
      params.require(:reading_goal).permit(:user_id, :book_club_id, :target_pages, :deadline)
    end
end