# Almosafer-Challenge

**This project is a web application built with Next.js, React, and TypeScript. It allows users to filter and view repositories and users. The README provides comprehensive instructions on how to set up the project, run it locally, run unit tests.**

## Features

- **Filtering:** Users can apply filters such as (Filter by type, Filter by query) to view repositories and users.
- **Persistence:** The (Filter by type) settings are persisted using Query Parameters.
- **Testing:** Components are unit-tested and integration-tested for reliability.
- **MUI:** Components are built with **[MUI](https://mui.com)** using its latest features.
- **MobX:** Application state-management using **[MobX](https://mobx.js.org/README.html)**
- **CI/CD:** Continuous Integration and Deployment using GitHub Actions for continuous integration and tests are automatically executed after each pull request to ensure the code's reliability.

## Table of Contents

- [**Getting Started**](#getting-started)
- [**Running Unit Tests**](#running-unit-tests)

## Getting Started

Follow these steps to set up and run the project locally:

#### 1. Clone the repo

First, clone the repository to your local machine using Git:

`git clone https://github.com/Hoziefa/almosafer-challenge.git`

#### 2. Install dependencies

Navigate to the project directory and install the required dependencies using Yarn:

`cd almosafer-challenge`

`yarn install`

#### 3. Run the development server

To start the development server locally, run the following command:

`yarn run dev`

This will launch the application at http://localhost:3000. You can access it in your web browser.

___

## Running Unit Tests

To run the unit tests, execute the following command:

`yarn run test:dev`

This command launches the test runner in interactive watch mode, making it easy to identify and fix issues.
