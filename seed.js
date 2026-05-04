const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Plant = require('./models/Plant');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Plant.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: adminPassword,
      isAdmin: true
    });

    // Create regular user
    const userPassword = await bcrypt.hash('123456', 10);
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: userPassword,
      isAdmin: false
    });

    // Create plants
    await Plant.insertMany([
      {
        name: 'Monstera Deliciosa',
        category: 'Indoor',
        price: 599,
        description: 'Beautiful tropical plant with large split leaves. Perfect for indoor decoration.',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
        stock: 15
      },
      {
        name: 'Snake Plant',
        category: 'Indoor',
        price: 299,
        description: 'Low maintenance plant that purifies air. Great for beginners.',
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400',
        stock: 25
      },
      {
        name: 'Peace Lily',
        category: 'Indoor',
        price: 399,
        description: 'Elegant white flowers with glossy green leaves. Thrives in low light.',
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400',
        stock: 20
      },
      {
        name: 'Fiddle Leaf Fig',
        category: 'Indoor',
        price: 899,
        description: 'Trendy plant with large violin-shaped leaves. Makes a statement.',
        image: 'https://images.unsplash.com/photo-1598880940371-c756e015faf4?w=400',
        stock: 10
      },
      {
        name: 'Pothos',
        category: 'Indoor',
        price: 249,
        description: 'Easy-care trailing plant. Perfect for hanging baskets.',
        image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b58?w=400',
        stock: 30
      },
      {
        name: 'Aloe Vera',
        category: 'Succulent',
        price: 199,
        description: 'Medicinal succulent with healing properties. Very low maintenance.',
        image: 'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?w=400',
        stock: 40
      },
      {
        name: 'Rubber Plant',
        category: 'Indoor',
        price: 499,
        description: 'Bold burgundy leaves that add drama to any space.',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
        stock: 12
      },
      {
        name: 'Spider Plant',
        category: 'Indoor',
        price: 199,
        description: 'Air-purifying plant with arching leaves. Easy to propagate.',
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400',
        stock: 35
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('Admin: admin@test.com / admin123');
    console.log('User: user@test.com / 123456');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
