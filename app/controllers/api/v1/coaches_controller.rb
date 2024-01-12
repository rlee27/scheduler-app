class Api::V1::CoachesController < ApplicationController
    before_action :set_coach, only: [:show, :reviews_and_needs_reviews]
    protect_from_forgery with: :null_session

    def index
        @coaches = join_with_user_table
        render json: @coaches, status: :ok
    end

    def show
        render json: @coach, status: :ok
    end

    def reviews_and_needs_reviews
        reviews = @coach.reviews.includes(booking: { student: :user })
        needs_reviews = @coach.bookings.where(review_written: false).includes(student: :user)
      
        render json: {
            reviews: reviews.as_json(
                only: [:feedback, :rating],
                include: {
                    booking: {
                        include: {
                            student: {
                                include: {
                                    user: { only: [:name] }
                                }
                            }
                        }
                    }
                }
            ),
            needsReviews: needs_reviews.as_json(
                only: [:date, :id],
                include: {
                    student: {
                        include: {
                            user: { only: [:name] }
                        }
                    }
                }
            )
        }
    end


    private

    def coach_params
        params.require(:coach).permit(:id)
    end

    def set_coach
        @coach = Coach.joins(:user).select('coaches.*, users.name as name').find(params[:id])
    end

    def join_with_user_table
        Coach.joins(:user).select('coaches.*, users.name as name')
    end
end