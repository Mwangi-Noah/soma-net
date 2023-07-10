class Api::ClubMembershipsController < ApplicationController
    before_action :set_club_membership, only: [:show, :destroy]
  
    def index
      @club_memberships = ClubMembership.all
      render json: @club_memberships
    end
  
    def show
      render json: @club_membership
    end
  
    def create
      @club_membership = ClubMembership.new(club_membership_params)
      if @club_membership.save
        render json: @club_membership, status: :created
      else
        render json: @club_membership.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @club_membership.destroy
      head :no_content
    end
  
    private
  
    def set_club_membership
      @club_membership = ClubMembership.find(params[:id])
    end
  
    def club_membership_params
      params.require(:club_membership).permit(:user_id, :book_club_id)
    end
end