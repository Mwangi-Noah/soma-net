class Api::PostsController < ApplicationController

  before_action :set_post, only: [:show, :upvote, :downvote, :remove_reactions]

  # GET /api/posts
  def index
    parent = params[:parent]
    return_with_comments = params[:returnWithComments]

    if parent && return_with_comments
      post = Post.find_by(id: parent)
      if post
        comments = post.comments
        if return_with_comments.downcase == 'true'
          render json: { post: post, comments: comments }
        else
          render json: { post: post }
        end
      else
        render json: { error: 'Post not found' }, status: :not_found
      end
    else
      @posts = Post.all
      render json: @posts
    end
  end

  # POST /api/posts
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: { error: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # GET /api/posts
  def index
    @posts = Post.all
    render json: @posts
  end

  # GET /api/posts/:id
  def show
    render json: @post
  end

  # GET /api/posts-number
  def number
    @post_count = Post.count
    render json: { count: @post_count }
  end

  
  # POST /api/posts/:id/upvote
  def upvote
    if @post.update(upvotes: @post.upvotes + 1)
      render json: { message: 'Post upvoted successfully' }
    else
      render json: { error: 'Failed to upvote the post' }, status: :unprocessable_entity
    end
  end

  # POST /api/posts/:id/downvote
  def downvote
    if @post.update(upvotes: @post.upvotes - 1)
      render json: { message: 'Post downvoted successfully' }
    else
      render json: { error: 'Failed to downvote the post' }, status: :unprocessable_entity
    end
  end

  # POST /api/posts/:id/remove-reactions
  def remove_reactions
    if @post.update(upvotes: 0)
      render json: { message: 'Post reactions removed successfully' }
    else
      render json: { error: 'Failed to remove post reactions' }, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @post = Post.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Post not found' }, status: :not_found
  end

  def post_params
    params.require(:post).permit(:title, :body, :author)
  end
end
end
