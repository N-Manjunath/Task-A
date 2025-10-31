const User = require('../models/User');

// Get users with advanced filtering, sorting, and pagination
exports.getUsers = async (req, res) => {
  try {
    const {
      search,
      role,
      status,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build match conditions
    const matchConditions = {};

    // Search filter (name or email)
    if (search && search.trim() !== '') {
      matchConditions.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { email: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    // Role filter
    if (role && role.trim() !== '') {
      matchConditions.role = role;
    }

    // Status filter
    if (status && status.trim() !== '') {
      matchConditions.status = status;
    }

    // Date range filter - only add if valid dates are provided
    if (startDate && startDate.trim() !== '' && !isNaN(Date.parse(startDate))) {
      if (!matchConditions.createdAt) matchConditions.createdAt = {};
      matchConditions.createdAt.$gte = new Date(startDate);
    }
    
    if (endDate && endDate.trim() !== '' && !isNaN(Date.parse(endDate))) {
      if (!matchConditions.createdAt) matchConditions.createdAt = {};
      // Set to end of day
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999);
      matchConditions.createdAt.$lte = endDateTime;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Sort configuration
    const sortConfig = {};
    sortConfig[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Aggregation pipeline for optimized query
    const pipeline = [
      { $match: matchConditions },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $sort: sortConfig },
            { $skip: skip },
            { $limit: limitNum },
            {
              $project: {
                name: 1,
                email: 1,
                role: 1,
                status: 1,
                createdAt: 1,
                age: 1,
                department: 1
              }
            }
          ]
        }
      }
    ];

    const result = await User.aggregate(pipeline);

    const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
    const users = result[0].data;

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page: parseInt(page),
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Seed database with sample data
exports.seedUsers = async (req, res) => {
  try {
    await User.deleteMany({});

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

    res.json({
      success: true,
      message: `${sampleUsers.length} users seeded successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Seeding failed',
      error: error.message
    });
  }
};
