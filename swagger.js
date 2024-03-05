const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Final Team Project CSE 341',
    description: 'Family Information API'
  },
  host: 'typescript-project.onrender.com',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  "tags": [
    {
      "name": "users",
      "description": "Operations related to users"
    }
  ],
  "schemes": [
    "https"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/users": {
      "get": {
        "summary": "Get all users",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new user",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/users/{id}": {
      "get": {
        "summary": "Get user by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        }
      },
      "put": {
        "summary": "Update user by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "user",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      },
      "delete": {
        "summary": "Delete user by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    }
  },
  "definitions": {
    "User": {
      "type": "object",
      "properties": {
        "username": {
          "type": "string",
          "example": "john_doe"
        },
        "email": {
          "type": "string",
          "example": "john@example.com"
        },
        "password": {
          "type": "string",
          "example": "hashed_password"
        },
        "role": {
          "type": "string",
          "example": "admin"
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "example": "2023-01-15T08:00:00Z"
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "example": "2023-01-15T08:00:00Z"
        }
      },
      "required": ["username", "email", "password", "role", "createdAt", "updatedAt"]
    }
  }
};

const outputFile = './swagger.json'; // Update this line
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
