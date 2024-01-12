# Weather Notification API

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2012-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D%204-blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

This API allows users to receive hourly weather reports via email based on their location. Users can store their email addresses, update their locations, and retrieve weather data for a specific day.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Environment Variables](#environment-variables)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Node.js (>= 12)
- MongoDB (>= 4)

### Installation

1. Clone the repository:

   ```bash
   git clone
   cd Weather_Notification_Core

   ```

markdown

# Weather Notification API

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2012-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D%204-blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

This API allows users to receive hourly weather reports via email based on their location. Users can store their email addresses, update their locations, and retrieve weather data for a specific day.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Environment Variables](#environment-variables)
- [Built With](#built-with)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites

- Node.js (>= 12)
- MongoDB (>= 4)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

    Install dependencies:

    bash
   ```

npm install

Set up a MongoDB database and obtain the connection string.

Create a .env file in the project root and add the following:

env

    MONGODB_URI=your-mongodb-connection-string
    OPENWEATHERMAP_API_KEY=your-openweathermap-api-key
    GMAIL_USER=your-email@gmail.com
    GMAIL_PASS=your-gmail-password

## Usage

### Endpoints

    GET   /users : Retriview All users with weather deatls with their Location
    POST /users: Store user details (name , email and city ).
    PUT /users/:id/location: Update
    user's location by user ID.
    (city )
    GET /users/:id/weather/:date: Retrieve user's weather data for a specific day.
    POST /users/:id/activate-notification : To activate email notifications for users and continuously send weather updates every 3 hours

### Environment Variables

    MONGODB_URI: MongoDB connection string.
    OPENWEATHERMAP_API_KEY: OpenWeatherMap API key.
    GMAIL_USER: Gmail email address for sending weather reports.
    GMAIL_PASS: Gmail password for sending weather reports.

## Built With

    Express - Web framework for Node.js.
    Mongoose - MongoDB ODM.
    Nodemailer - Email sending library.
    Axios - HTTP client for fetching weather data.
    OpenWeatherMap API - Weather data provider.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

    Thanks to OpenWeatherMap for providing weather data.
    Inspiration for this project came from assessment
