## FlyBuddy

FlyBuddy is a revolutionary web application that connects travelers with potential companions on their upcoming flights. Our platform facilitates social connections between like-minded individuals, enhancing the travel experience from takeoff to landing.

## Features

- Find companions on your specific flights
- In-app messaging system for pre-flight connections
- Detailed flight information display
- User profiles with travel preferences
- Secure and verified user accounts
- Responsive design for seamless use across all devices

## Getting Started

To use FlyBuddy, simply visit our website at [www.flybuddy.com](https://www.flybuddy.com) and create an account. Once registered, you can start searching for flight companions right away!

## For Developers

If you're setting up a development environment for FlyBuddy, follow these steps:

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/flybuddy/flybuddy-app.git
   cd flybuddy
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install
   cd client
   npm install
   ```

3. Create a `.env` file in the root directory with the following contents:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flybuddy
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```
   Replace `your_jwt_secret_here` with a secure random string.

### Running the Application

1. Start the backend server:
   ```
   npm run server
   ```
   or
   ```
   node server.js
   ```
   The server will run on `http://localhost:5000` by default.

2. In a new terminal, start the frontend development server:
   ```
   cd client
   npm start
   ```
   The React app will run on `http://localhost:3000` by default.

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Support

If you encounter any issues or have questions about using FlyBuddy, please contact our support team at support@flybuddy.com.

## Privacy and Security

At FlyBuddy, we take your privacy and security seriously. All user data is encrypted and stored securely. For more information, please read our [Privacy Policy](https://www.flybuddy.com/privacy) and [Terms of Service](https://www.flybuddy.com/terms).

## About Us

FlyBuddy was founded in 2024 with a mission to make air travel more social and enjoyable. Our team of experienced developers and travel enthusiasts is dedicated to creating the best possible experience for our users.

## Contact

For business inquiries, please contact us at business@flybuddy.com.

---

© 2024 FlyBuddy, Inc. All rights reserved.