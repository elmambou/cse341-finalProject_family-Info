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
    },
    {
      "name": "addresses",
      "description": "Operations related to addresses"
    },
    {
      "name": "relationships",
      "description": "Operations related to relationships"
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
    "/addresses": {
      "get": {
        "summary": "Get all addresses",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Address"
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new address",
        "parameters": [
          {
            "name": "address",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Address"
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
    "/addresses/{id}": {
      "get": {
        "summary": "Get address by ID",
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
              "$ref": "#/definitions/Address"
            }
          }
        }
      },
      "put": {
        "summary": "Update address by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "address",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Address"
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
        "summary": "Delete address by ID",
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
    },
    "/relationships": {
      "get": {
        "summary": "Get all relationships",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Relationship"
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new relationship",
        "parameters": [
          {
            "name": "relationship",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Relationship"
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
    "/relationships/{id}": {
      "get": {
        "summary": "Get relationship by ID",
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
              "$ref": "#/definitions/Relationship"
            }
          }
        }
      },
      "put": {
        "summary": "Update relationship by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "relationship",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Relationship"
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
        "summary": "Delete relationship by ID",
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
    "Address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string",
          "example": "123 Main St"
        },
        "city": {
          "type": "string",
          "example": "Anytown"
        },
        "state": {
          "type": "string",
          "example": "CA"
        },
        "zipcode": {
          "type": "string",
          "example": "12345"
        },
        "country": {
          "type": "string",
          "example": "USA"
        },
        "user_id": {
          "type": "string",
          "example": "61e733ac3e0fa10345bce081"
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "example": "2023-07-10T08:00:00Z"
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "example": "2023-07-10T08:00:00Z"
        }
      },
      "required": ["street", "city", "state", "zipcode", "country", "user_id", "createdAt", "updatedAt"]
    },
    "Relationship": {
      "type": "object",
      "properties": {
        "individual1_id": {
          "type": "string",
          "example": "61e733ac3e0fa10345bce084"
        },
        "individual2_id": {
          "type": "string",
          "example": "61e733ac3e0fa10345bce086"
        },
        "relationship_type": {
          "type": "string",
          "example": "child"
        },
        "user_id": {
          "type": "string",
          "example": "61e733ac3e0fa10345bce081"
        },
        "createdAt": {
          "type": "string",
          "format": "date-time",
          "example": "2024-02-18T08:00:00Z"
        },
        "updatedAt": {
          "type": "string",
          "format": "date-time",
          "example": "2024-02-18T08:00:00Z"
        }
      },
      "required": ["individual1_id", "individual2_id", "relationship_type", "user_id", "createdAt", "updatedAt"]
    }
  }
};

const outputFile = './swagger.json'; // Update this line
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
