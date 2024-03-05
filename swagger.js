const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contact API'
  },
  host: 'localhost:8083',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'users',
      description: 'Operations related to users'
    }
  ],
  definitions: {
    User: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string' },
        createdAt: { type: 'Date' },
        updatedAt: { type: 'Date' }

      },
      required: ['username', 'email', 'password', 'role', 'createdAt', 'updateAt']
    }
  }
};

const outputFile = './swagger.json'; // Update this line
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
