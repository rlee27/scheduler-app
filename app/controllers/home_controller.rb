class HomeController < ApplicationController
  def index
  end

  def default
    render 'home/index'
  end
end
