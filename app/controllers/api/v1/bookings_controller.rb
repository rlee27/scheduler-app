class Api::V1::BookingsController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_coach, only: [:index]

    def index
        @bookings = fetch_bookings_with_student_and_coach_names(@coach.id)
        render json: render_bookings(@bookings), status: :ok
    end
    
    def show
        
    end

    def create
        @booking = Booking.new(booking_params)
        if @booking.save
            delete_availability(@booking.coach_id, @booking.date)
            render json: { data: @booking, status: 'success'}, status: :ok
        else
            render json: { data: @booking.errors.full_messages, status: 'failure'}, status: :unprocessable_entity
        end
    end

    private

    def fetch_bookings_with_student_and_coach_names(coach_id)
        Booking
            .joins(student: :user, coach: :user)
            .where(coach_id: @coach.id)
            .select('bookings.*, users.name as student_name, users_coaches.name as coach_name')
    end

    def fetch_coach_past_bookings(coach_id)
        Booking
            .joins(student: :user, coach: :user)
            .where(coach_id: @coach.id)
            .where("bookings.date < ?", Time.now.beginning_of_day)
            .select('bookings.*, users.name as student_name, users_coaches.name as coach_name')
    end

    def fetch_coach_future_bookings(coach_id)
        Booking
            .joins(student: :user, coach: :user)
            .where(coach_id: @coach.id)
            .where("bookings.date >= ?", Time.now.beginning_of_day)
            .select('bookings.*, users.name as student_name, users_coaches.name as coach_name')
    end

    # def set_booking
    #     @booking = fetch_bookings_with_student_and_coach_names(@coach.id).find(params[:id])
    # end

    def set_coach
        @coach = Coach.find(params[:coach_id])
    end

    def render_booking(booking)
        {
            id: booking.id,
            coach_id: booking.coach_id,
            student_id: booking.student_id,
            date: booking.date.strftime('%Y-%m-%d'),
            time: booking.date.strftime('%H:%M'),
            coach_name: booking.coach_name,
            student_name: booking.student_name
        }
    end

    def render_bookings(bookings)
        bookings.map {|booking| render_booking(booking)}
    end

    def booking_params()
        params.require(:booking).permit(:student_id, :coach_id, :date)
    end

    def delete_availability(coach_id, date)
        Availability.find_by(coach_id: coach_id, date: date)&.destroy
    end
end