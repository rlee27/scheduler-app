class Api::V1::ReviewsController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :set_coach, only: [:index]

    def index
        @reviews = @coach.reviews
        render json: @reviews, status: :ok
    end

    def show
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            update_booking(@review.booking)
            render json: { data: @review, status: 'success'}, status: :ok
        else
            render json: { data: @review.errors.full_messages, status: 'failure'}, status: :unprocessable_entity
        end
    end

    private

    def set_coach
        @coach = Coach.find(params[:coach_id])
    end

    def review_params
        params.require(:review).permit(:booking_id, :rating, :feedback)
    end

    def update_booking(booking)
        booking.update(review_written: true)
    end

end