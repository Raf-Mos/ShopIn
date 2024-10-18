
# ShopIn Website

## Description

This is a full-stack e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack.
The website provides a seamless shopping experience, allowing users to browse products,
add items to their cart, and securely place orders.
The platform also includes admin functionality for managing products, orders, and users.

## Features

- **User Authentication**: Secure user registration and login system with JWT authentication.
- **Product Catalog**: Dynamic product listings with search, filter, and sort options.
- **Shopping Cart**: Users can add products to the cart, modify quantities, and proceed to checkout.
- **Order Management**: Place orders and view order history.
- **Admin Dashboard**: Manage products, categories, orders, and users.

## Technologies Used

- **Frontend**: React.js, Redux for state management, Tailwind CSS for styling.
- **Backend**: Node.js, Express.js for building the RESTful API.
- **Database**: MongoDB with Mongoose for data storage.
- **Authentication**: JSON Web Tokens (JWT) for user authentication and authorization.
- **Payment Integration**: [Specify payment gateway, e.g., PayPal].

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Raf-Mos/ShopIn.git
   ```

2. **Install dependencies for both frontend and backend**:
   ```bash
   cd ShopIn
   npm install
   cd frontend
   npm install
   ```

3. **Create a `.env` file in the root directory and add the following environment variables**:
   ```plaintext
   PORT=5000
   MONGO_URI='mongodb://127.0.0.1:27017/ShopInDB'
   NODE_ENV=development
   JWT_SECRET=abac12afsdkjladf
   PAYPAL_CLIENT_ID=
   ```

4. **Run the application**:
   - Backend:
     ```bash
     npm run backend
     ```
   - Frontend:
     ```bash

     npm run frontend
     ```
   - Backend + Frontend:
      ```bash
      npm run dev
      ```

5. **Open the app** in your browser:
   ```
   http://localhost:5173
   ```

## Screenshots

### Dashboard View
![Dashboard Screenshot](Screenshot_dashboard.png)

### Shopping Cart View
![Shopping Cart Screenshot](Screenshot_website4.png)

### Special Products View
![Products Screenshot](Screenshot_website2.png)

## Future Enhancements

- Add support for discount coupons
- Implement a product review and rating system
- Support for multiple languages and currencies
- Enhanced security with 2-factor authentication

## Authors
Mohammed Boukar - [Github](https://github.com/SimoBoukar) / [Twitter](https://twitter.com/simoboukar)
Mostafa Rafiki - [Github](https://github.com/Raf-Mos) / [Twitter](https://twitter.com/rafiki_mostafa)