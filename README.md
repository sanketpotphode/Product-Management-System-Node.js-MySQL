# Product Management System API

This project is a Product Management System API built with Node.js, Express, and MySQL.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Product Management System API provides functionalities for managing products, including listing all products, getting product details, creating, updating, and deleting products.

## Features

- Get a list of all products with pagination and filtering options.
- Get details of a specific product by ID.
- Create new products.
- Update existing products.
- Delete products.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sanketpotphode/Product-Management-System-Node.js-MySQ
   cd product-management-api


### env configuration

DB_HOST=<your-database-host>
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>



### command to install dependencies

npm install


### API Endpoints

-> Product endpoints 

1.  http://localhost:3000/products/
  - to get all products  (GET Method)

2. http://localhost:3000/products/:id
    -get product by id (GET Method)

3. http://localhost:3000/products/
    -add product (POST Method)

4. http://localhost:3000/products/:id
    -Update product by id (PUT Method)

5 . http://localhost:3000/products/:id
    -Delete product by id (DELETE Method)




-> Users endpoints 

1. http://localhost:3000/users/:id
    - Get user information with the given id(GET Method).

2. http://localhost:3000/users
    - Add a new user (POST Method), expects {username, password} in the request body

3. http://localhost:3000/users
    - Update User information with the given username(PUT Method), expects {password} in the request body

4. http://localhost:3000/users/:id
    - Delete a user using his id(DELETE Method)

5. http://localhost:3000/users/profile
    -Get logged-in users profile information(GET Method)

6. http://localhost:3000/users/register
    -Register a new user and return jwt token(POST Method), expects{username, password, role } in the request body

7. http://localhost:3000/users/login
    - Logs in an existing user and returns jwt token if successful(POST Method)


