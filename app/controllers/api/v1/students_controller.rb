class Api::V1::StudentsController < ApplicationController
    before_action :set_student, only: [:show]
    protect_from_forgery with: :null_session

    def index
        @students = join_with_user_table
        render json: @students, status: :ok
    end

    def show
        render json: @student, status: :ok
    end

    private

    def join_with_user_table
        Student.joins(:user).select('students.*, users.name as name')
    end

    def student_params
        params.require(:coach).permit(:id)
    end

    def set_student
        @student = Student.joins(:user).select('students.*, users.name as name').find(params[:id])
    end
end