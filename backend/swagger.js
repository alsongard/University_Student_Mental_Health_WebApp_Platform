const swaggerJsDoc = require('swagger-jsdoc');


const options = {
    definition: {
        info: {
            title: "My API",
            version: "1.0.0",
            description: "A sample API for learning Swagger",
        },
        servers: [
        {
            url: "http://localhost:5000",
            description: "Development server",
        },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API docs
};
 
const specs = swaggerJsDoc(options);
module.exports = {specs};