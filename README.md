# MoodJournal 🧠✨

A MERN Stack-based mood tracking journal where users can log their daily moods and reflect over time through interactive charts and entries.

## 🧩 Features

- 📝 Add and manage your daily mood entries.
- 📊 Visualize your mood trends using interactive charts.
- 🔒 Secure login and registration system with JWT-based authentication.
- 🎯 Role-based access (admin/user).
- 🚀 Smooth UI built using Tailwind CSS and Redux.

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Zustand
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

## 🖥️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Y4shPatel/MoodJournal.git
cd MoodJournal
```

### 2. Start the Backend
```bash
cd backend
npm install

Create a .env file in the backend folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Then start the backend server:
bash
npm run start
```

### 3.Setup frontend
```bash
cd ../frontend
npm install
npm run dev
```
