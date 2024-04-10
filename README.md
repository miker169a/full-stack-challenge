# Full Stack Challenge

## Getting Started

These instructions will guide you through setting up the project locally for development and testing purposes.

### Prerequisites

Ensure you have the following software installed:

- Docker
- Docker Compose

Docker can be downloaded from [Docker's official website](https://www.docker.com/products/docker-desktop), which includes Docker Compose.

### Installing and Running

Follow these steps to set up your development environment:

1. **Clone the repository**

    Use the following commands to clone the repository and navigate into the project directory:

    ```bash
    git clone https://github.com/yourusername/full-stack-challenge.git
    cd full-stack-challenge
    ```

2. **Start the Application**

    Launch the application with Docker Compose:

    ```bash
    docker-compose up --build
    ```

After starting the application:

- The API will be available at `http://localhost:3001`
- The website can be accessed at `http://localhost:3000`

### API Documentation

The API documentation, powered by TSOA, is accessible at `http://localhost:3001/docs`. TSOA generates both the Swagger documentation and route handlers based on TypeScript decorators, ensuring up-to-date and accurate documentation.

#### RTKQuery Code Generation

- To generate TSOA routes and Swagger docs, run:
  
  ```bash
  cd api
  npm run generate
```
- For generating the client API for RTKQuery, execute:

      ```bash
      cd events
      npm run generate-api
      ```

- To populate the database with sample data (warning: this will delete current data):

      ```bash
      cd api
      ts-node generateEvents.ts
      ```
      Ensure TS-Node is installed globally for the above command to work.

