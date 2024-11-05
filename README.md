# QuadB Assignment - Cryptocurrency Price Tracker

This project is a simple cryptocurrency price tracker inspired by the webpage [hodlinfo.com](https://hodlinfo.com). It uses **Node.js** and **Express** for the backend, **HTML** and **CSS** for the frontend, and **MongoDB** as the database.

## Features

- Fetches top 10 cryptocurrency data from the [WazirX API](https://api.wazirx.com/api/v2/tickers).
- Stores data in a MongoDB database.
- Displays cryptocurrency information on a webpage, including:
  - Last traded price
  - Buy/Sell price
  - Volume
  - Savings
- The layout and style are similar to hodlinfo.com.

## Prerequisites

To run this project, you’ll need the following installed on your machine:

- **Node.js**: [Download here](https://nodejs.org/)
- **MongoDB**: [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-hosted database.
- **Git**: [Download here](https://git-scm.com/)

## Setup Instructions

Follow these steps to set up and run the project:

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pawan8620/quadB.git
   cd quadB
   ```

2. **Install dependencies**

   Install the required dependencies by running:

   ```bash
   npm install
   ```

3. **Set up MongoDB**

   - If you’re using a local MongoDB instance, ensure it’s running on your machine.
   - If using MongoDB Atlas, get your connection string.

4. **Create an `.env` file**

   In the project root, create a `.env` file to store environment variables. Add the following line, replacing `<YOUR_MONGODB_CONNECTION_STRING>` with your MongoDB connection string:

   ```plaintext
   MONGO_URI=<YOUR_MONGODB_CONNECTION_STRING>
   ```

5. **Run the server**

   Start the server with:

   ```bash
   npm start
   ```

   The server should now be running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

- **GET `/api/crypto`**: Fetches the top 10 cryptocurrency data from the MongoDB database.

## Technologies Used

- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **API**: [WazirX API](https://api.wazirx.com/api/v2/tickers)

## Acknowledgments

- [WazirX](https://wazirx.com/) for providing the public API for cryptocurrency data.
- [hodlinfo.com](https://hodlinfo.com) for design inspiration.

---
