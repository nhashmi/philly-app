class RequestsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_request, only: [:show, :edit, :update, :destroy]

  def index
    @requests = current_user.requests
  end

  def show
  end

  def new
    @request = current_user.requests.new
    respond_to do |format|
      format.html 
      format.json {render json: @request}
    end
  end

  def create
    @request = current_user.requests.new(request_params)
    @request.save
    render :nothing => true, :status => 200, :content_type => 'text/html'
    # respond_to do |format| 
    #   if @request.save
    #     redirect_to user_request_url(current_user, @request)
    #   else
    #     render :new
    #   end
    # end
  end

  def edit
  end

  def update
    if @request.update(request_params)
      redirect_to user_request_url(current_user, @request)
    else
      render :edit
    end
  end

  def destroy
    @request.destroy
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  private

    def find_request
      @request = current_user.requests.find(params[:id])
    end

    def request_params
      params.require(:request).permit(:service_id, :notes)
    end


end