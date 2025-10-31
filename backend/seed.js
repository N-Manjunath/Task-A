const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../Models/User');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB Connected');
    
    // Clear existing data
    await User.deleteMany({});
    
    // Generate sample users
    const sampleUsers = [];
    const roles = ['Admin', 'User', 'Manager', 'Guest'];
    const statuses = ['Active', 'Inactive', 'Pending'];
    const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales'];
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'James', 'Mary'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

    for (let i = 1; i <= 150; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      sampleUsers.push({
        name: `${firstName} ${lastName}`,
        email: `user${i}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        age: Math.floor(Math.random() * (65 - 22 + 1)) + 22,
        department: departments[Math.floor(Math.random() * departments.length)],
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000)
      });
    }

    await User.insertMany(sampleUsers);
    console.log('✅ Database seeded with 150 users');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });