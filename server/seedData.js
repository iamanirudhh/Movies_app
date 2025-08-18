import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MovieModel } from './model/MovieModel.js';
import { UserModel } from './model/userModel.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await MovieModel.deleteMany({});
        await UserModel.deleteMany({});
        console.log('Cleared existing data');

        // Create sample movies
        const movies = [
            {
                title: "Spider-Man",
                description: "A superhero adventure with amazing web-slinging action. Peter Parker gains spider-like abilities and becomes Spider-Man to fight crime in New York City.",
                rating: "8.5/10",
                image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
                genre: "Action, Adventure",
                cast: "Tom Holland, Zendaya, Jacob Batalon",
                director: "Jon Watts",
                duration: "2h 1m",
                language: "English",
                ticketPrice: 12,
                showtimes: ["12:00 PM", "3:00 PM", "7:00 PM", "10:00 PM"],
                isActive: true
            },
            {
                title: "The Lion King",
                description: "A heartwarming story about a young lion's journey. A young lion prince flees his kingdom after his father's death, only to learn the true meaning of responsibility.",
                rating: "8.8/10",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
                genre: "Animation, Family",
                cast: "Donald Glover, Beyoncé, James Earl Jones",
                director: "Jon Favreau",
                duration: "1h 58m",
                language: "English",
                ticketPrice: 12,
                showtimes: ["12:00 PM", "3:00 PM", "7:00 PM", "10:00 PM"],
                isActive: true
            },
            {
                title: "Frozen",
                description: "An animated musical about sisterly love and magic. Two sisters discover the power of love and friendship in this magical animated adventure.",
                rating: "8.2/10",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                genre: "Animation, Musical",
                cast: "Kristen Bell, Idina Menzel, Josh Gad",
                director: "Chris Buck, Jennifer Lee",
                duration: "1h 42m",
                language: "English",
                ticketPrice: 12,
                showtimes: ["12:00 PM", "3:00 PM", "7:00 PM", "10:00 PM"],
                isActive: true
            },
            {
                title: "Avengers",
                description: "Earth's mightiest heroes unite to save the world. Earth's mightiest heroes must come together and learn to fight as a team to stop the mischievous Loki and his alien army.",
                rating: "8.9/10",
                image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
                genre: "Action, Sci-Fi",
                cast: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
                director: "Joss Whedon",
                duration: "2h 23m",
                language: "English",
                ticketPrice: 15,
                showtimes: ["12:00 PM", "3:00 PM", "7:00 PM", "10:00 PM"],
                isActive: true
            }
        ];

        const createdMovies = await MovieModel.insertMany(movies);
        console.log(`Created ${createdMovies.length} movies`);

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = new UserModel({
            name: 'Admin User',
            email: 'admin@moviemania.com',
            password: hashedPassword,
            phone: '+1234567890',
            role: 'admin',
            isActive: true
        });

        await adminUser.save();
        console.log('Created admin user');

        // Create a sample regular user
        const userPassword = await bcrypt.hash('user123', 10);
        const regularUser = new UserModel({
            name: 'John Doe',
            email: 'user@moviemania.com',
            password: userPassword,
            phone: '+1234567891',
            role: 'user',
            isActive: true
        });

        await regularUser.save();
        console.log('Created sample user');

        console.log('Seed data created successfully!');
        console.log('\nLogin credentials:');
        console.log('Admin: admin@moviemania.com / admin123');
        console.log('User: user@moviemania.com / user123');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

seedData();
