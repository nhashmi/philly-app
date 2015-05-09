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
    if current_user.addresses.length == 0
      @welcome_message = "Thanks for signing up! Now add an address below."
    else
      @welcome_message = "Add an address"
    end
    @address = current_user.addresses.new
  end

  def create
    @address = current_user.addresses.new(address_params)
    if @address.save
      redirect_to user_address_url(current_user, @address)
    else
      render :new
    end
  end

  def edit 
    @welcome_message = "Update an address"
  end

  def update
    if @address.update(address_params)
      redirect_to user_address_url(current_user, @address)
    else
      render :edit
    end
  end

  def destroy
    @address.destroy
    redirect_to user_addresses_path
  end


  private

    def find_address
      @address = current_user.addresses.find(params[:id])
    end

    def address_params
      params.require(:address).permit(:street_address, :unit)
    end

end
