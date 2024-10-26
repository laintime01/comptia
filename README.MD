# CompTIA Exam Practice Platform

A comprehensive web platform designed to help users prepare for CompTIA certification exams (Network+, Security+, A+). This application provides an interactive learning environment with practice questions, performance tracking, and personalized study paths.

## 🚀 Features

### User Management
- Secure user authentication system
- Personalized user profiles
- Role-based access control (user/admin)
- Password reset functionality
- Session management

### Exam Practice
- Multiple choice practice questions
- Support for different CompTIA certifications:
  - Network+
  - Security+
  - A+
- Customizable exam settings:
  - Difficulty levels (easy, medium, hard, mixed)
  - Number of questions per exam
  - Question categories

### Progress Tracking
- Detailed exam history
- Performance analytics:
  - Overall progress
  - Category-wise scores
  - Average scores
  - Best scores
- Study statistics

### User Preferences
- Exam difficulty preferences
- Questions per exam customization
- Preferred certification categories
- User interface customization

## 🛠 Technology Stack

### Frontend
- **React** - User interface library
- **React Router** - Navigation and routing
- **Tailwind CSS** - Styling and UI components
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon components
- **Lucide React** - Additional icon set

### Backend
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JSON Web Tokens (JWT)** - Authentication
- **bcrypt.js** - Password hashing
- **Express Validator** - Request validation

### Development Tools
- **nodemon** - Development server
- **cross-env** - Environment variable management
- **dotenv** - Environment configuration

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with following variables
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5001

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file if needed
REACT_APP_API_URL=http://localhost:5001

# Start development server
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `GET /api/auth/verify-token` - Token verification

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/preferences` - Update user preferences

### Exam System
- `GET /api/questions` - Get practice questions
- `POST /api/exams` - Start new exam
- `PUT /api/exams/:id` - Submit exam answers
- `GET /api/exams/history` - Get exam history

## 💡 Usage

1. Register a new account or login with existing credentials
2. Customize your exam preferences
3. Start practice exams
4. Review your performance in the dashboard
5. Track your progress over time
6. Focus on areas needing improvement

## 🔐 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Request validation
- Protected API endpoints
- Session management
- CORS protection

## 🚧 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Style
- ESLint for code linting
- Prettier for code formatting

## 📈 Future Enhancements

- Additional certification types
- Interactive study guides
- Performance analytics dashboard
- Social features (study groups, forums)
- Mobile application
- Offline mode support

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details

## 🙏 Acknowledgments

- CompTIA for certification standards
- Open source community
- All contributors

## 📧 Contact

If you have any questions or suggestions, please open an issue or submit a pull request.