class Api::DiscussionQuestionsController < ApplicationController
    before_action :set_discussion_question, only: [:show, :update, :destroy]
  
    def index
      @discussion_questions = DiscussionQuestion.all
      render json: @discussion_questions
    end
  
    def show
      render json: @discussion_question
    end
  
    def create
      @discussion_question = DiscussionQuestion.new(discussion_question_params)
      if @discussion_question.save
        render json: @discussion_question, status: :created
      else
        render json: @discussion_question.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @discussion_question.update(discussion_question_params)
        render json: @discussion_question
      else
        render json: @discussion_question.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @discussion_question.destroy
      head :no_content
    end
  
    private
  
    def set_discussion_question
      @discussion_question = DiscussionQuestion.find(params[:id])
    end
  
    def discussion_question_params
      params.require(:discussion_question).permit(:user_id, :book_club_id, :question)
    end
end