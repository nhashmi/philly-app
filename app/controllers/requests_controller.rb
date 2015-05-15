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
    # Allow create from AJAX post request and don't refresh page
    render :nothing => true, :status => 200, :content_type => 'text/html'
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
    redirect_to user_requests_path
  end

  private

    def find_request
      @request = current_user.requests.find(params[:id])
    end

    def request_params
      params.require(:request).permit(:service_id, :notes)
    end


end