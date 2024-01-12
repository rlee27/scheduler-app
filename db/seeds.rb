# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
User.destroy_all
users = User.create([
    {
        name: "Steve Kerr",
        role: "Coach"
    },
    {
        name: "Stephen Curry",
        role: "Student"
    },
    {
        name: "Draymond Green",
        role: "Student"
    },
    {
        name: "Chris Paul",
        role: "Student"
    },
    {
        name: "Darvin Ham",
        role: "Coach"
    },
    {
        name: "Lebron James",
        role: "Student"
    },
    {
        name: "Anthony Davis",
        role: "Student"
    },
    {
        name: "Austin Reaves",
        role: "Student"
    },
    {
        name: "Tom Thibodeau",
        role: "Coach"
    },
    {
        name: "Jalen Brunson",
        role: "Student"
    },
    {
        name: "Julius Randle",
        role: "Student"
    },
    {
        name: "RJ Barrett",
        role: "Student"
    },
    {
        name: "Jacque Vaughn",
        role: "Coach"
    },
    {
        name: "Mikal Bridges",
        role: "Student"
    },
    {
        name: "Spencer Dinwiddie",
        role: "Student"
    },
    {
        name: "Nic Claxton",
        role: "Student"
    }
])
Coach.destroy_all
coaches = Coach.create([
    {
        user_id: 1
    },
    {
        user_id: 5
    },
    {
        user_id: 9
    },
    {
        user_id: 13
    }
])

Student.destroy_all
students = Student.create([
    {
        user_id: 2
    },
    {
        user_id: 3
    },
    {
        user_id: 4
    },
    {
        user_id: 6
    },
    {
        user_id: 7
    },
    {
        user_id: 8
    },
    {
        user_id: 10
    },
    {
        user_id: 11
    },
    {
        user_id: 12
    },
    {
        user_id: 14
    },
    {
        user_id: 15
    },
    {
        user_id: 16
    }
])

Booking.destroy_all
bookings = Booking.create([
    {
        coach_id: 1,
        student_id: 1,
        date: "2023-12-20 16:00"
    },
    {
        coach_id: 2,
        student_id: 5,
        date: "2023-12-19 14:00"
    },
    {
        coach_id: 3,
        student_id: 9,
        date: "2023-12-18 12:00"
    },
    {
        coach_id: 4,
        student_id: 11,
        date: "2023-12-20 14:00"
    },
    {
        coach_id: 1,
        student_id: 2,
        date: "2023-12-22 16:00"
    },
    {
        coach_id: 2,
        student_id: 3,
        date: "2023-12-20 16:00"
    },
    {
        coach_id: 3,
        student_id: 7,
        date: "2023-12-20 16:00"
    },
    {
        coach_id: 3,
        student_id: 10,
        date: "2023-12-19 16:00"
    },
    {
        coach_id: 1,
        student_id: 3,
        date: "2023-12-22 16:00"
    }
])

Booking.create([
    {
        coach_id: 1,
        student_id: 1,
        date: "2023-12-4 16:00"
    },
    {
        coach_id: 2,
        student_id: 5,
        date: "2023-12-5 14:00"
    },
    {
        coach_id: 3,
        student_id: 9,
        date: "2023-12-8 12:00"
    },
    {
        coach_id: 4,
        student_id: 11,
        date: "2023-12-10 14:00"
    },
    {
        coach_id: 1,
        student_id: 2,
        date: "2023-12-3 16:00"
    },
    {
        coach_id: 2,
        student_id: 3,
        date: "2023-12-7 16:00"
    },
    {
        coach_id: 3,
        student_id: 7,
        date: "2023-12-9 16:00"
    },
    {
        coach_id: 3,
        student_id: 10,
        date: "2023-12-3 16:00"
    },
    {
        coach_id: 1,
        student_id: 3,
        date: "2023-12-2 16:00"
    }
])

Review.destroy_all
Review.create([
    {
        booking_id: 24,
        rating: 5,
        feedback: "Shoot more 3s"
    },
    {
        booking_id: 25,
        rating: 2,
        feedback: "Needs to drive to the basket more often"
    },
    {
        booking_id: 26,
        rating: 3,
        feedback: "Crash the boards, we need help"
    },
    {
        booking_id: 27,
        rating: 4,
        feedback: "Review footage to better guard assignment"
    },
    {
        booking_id: 28,
        rating: 5,
        feedback: "Find the open man and pass. Stick to the plays"
    },
    {
        booking_id: 29,
        rating: 4,
        feedback: "Attack the paint. Pass to the open man. Believe in your teammates."
    },
    {
        booking_id: 30,
        rating: 3,
        feedback: "Be open to the mid range shot. Don't settle for a 3 if you're not open."
    },
    {
        booking_id: 31,
        rating: 2,
        feedback: "Will work on setting screens. Watch plays develop and make the best decision"
    },
    {
        booking_id: 32,
        rating: 5,
        feedback: "Don't take too much off the shot clock when we;re behind. Don't settle for the 3 ball but take it if the defense is giving space."
    },
])

Availability.create([
    {
        coach_id: 1,
        date: '2023-12-21 10:00'
    },
    {
        coach_id: 1,
        date: '2023-12-21 16:00'
    },
    {
        coach_id: 1,
        date: '2023-12-23 13:00'
    }
])