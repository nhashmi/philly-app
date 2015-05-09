class AddressesController < ApplicationController

  # before any of the below address actions happen, the user will be authenticated
  before_action :authenticate_user!
  before_action :find_address, only: [:show, :edit, :update, :destroy]

  def index
    @addresses = current_user.addresses
  end

  def show
  end

  def new
    @address = Address.new
  end

  def create
    @address = current_user.addresses.new(address_params)
    if @address.save
      redirect_to @address
    else
      render :new
    end
  end

  def edit 
  end

  def update
    if @address.update
      redirect_to @address
    else
      render :edit
  end

  def destroy
    @address.destroy
    redirect_to addresses_path
  end


  private

    def find_address
      @address = Address.find(params[:id])
    end

    def address_params
      params.require(:address).permit(:street_address)
    end

  end

end
