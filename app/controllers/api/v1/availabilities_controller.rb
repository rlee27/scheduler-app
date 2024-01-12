class Api::V1::AvailabilitiesController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_coach, only: [:index, :create]
    
    def index
        @availabilities = fetch_availabilities_with_coach_names()
        render json: render_availabilities(@availabilities), status: :ok
    end

    def create
        @availability = Availability.new(availability_params)
        if @availability.save
            render json: { data: @availability, status: 'success'}, status: :ok
        else
            render json: { data: @availability.errors.full_messages, status: 'failure'}, status: :unprocessable_entity
        end
    end

    private

    def fetch_availabilities_with_coach_names
        current_datetime = DateTime.now
        Availability
            .joins(coach: :user)
            .where(coach_id: @coach.id)
            .where('availabilities.date >= ?', current_datetime)
            .select('availabilities.*, users.name as coach_name')
    end

    def set_coach
        @coach = Coach.find(params[:coach_id])
    end

    def render_availability(availability)
        {
            id: availability.id,
            date: availability.date.strftime('%Y-%m-%d'),
            time: availability.date.strftime('%H:%M'),
            coach_name: availability.coach_name,
        }
    end

    def render_availabilities(availabilities)
        availabilities.map {|availability| render_availability(availability)}
    end

    def availability_params
        params.require(:availability).permit(:date, :coach_id)
    end
end