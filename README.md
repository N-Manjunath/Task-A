# 🚀 MERN Advanced Filter & Pagination System

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring advanced filtering, sorting, pagination, and data export functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB aggregation pipelines for efficient queries
- ✅ Optimized database queries with indexes
- ✅ Advanced filtering (search, role, status, date range)
- ✅ Flexible sorting (ascending/descending)
- ✅ Pagination with configurable page size
- ✅ Error handling middleware
- ✅ Sample data seeding script

### Frontend
- ✅ Responsive React UI
- ✅ Real-time search functionality
- ✅ Multi-criteria filtering
- ✅ Sortable table columns
- ✅ Dynamic pagination controls
- ✅ Export to CSV
- ✅ Export to Excel
- ✅ Modern, clean design
- ✅ Loading states and error handling

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

**Frontend:**
- React 18
- Axios
- React Icons
- XLSX (SheetJS)
- FileSaver.js

## 📦 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/N-Manjunath/Task-A.git)
cd Task-A
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

## 🚀 Usage

### Starting the Application

**Terminal 1 - Backend:**
```bash
cd backend
node app.js
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

### Seeding the Database

**Option 1: Using the UI**
1. Open `http://localhost:3000` in your browser
2. Click the **"Seed Database"** button in the top-right corner
3. 150 sample users will be created

**Option 2: Using API**
```bash
curl -X POST http://localhost:5000/api/users/seed
```

**Option 3: Using npm script (if configured)**
```bash
cd backend
npm run seed
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```
