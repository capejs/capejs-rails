class Api::VisitorsController < ApplicationController
  def index
    @visitors = Visitor.order('id')
  end

  def create
    visitor = Visitor.new(visitor_params)
    if visitor.save
      render json: { result: 'Success' }
    else
      render json: { result: 'Failure', errors: visitor.errors.full_messages }
    end
  end

  private
  def visitor_params
    params.require(:visitor).permit(:family_name, :given_name)
  end
end
