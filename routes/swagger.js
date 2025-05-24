const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Princesses and Castles API",
      version: "1.0.0",
      description: "API documentation for the Princess and Castle project"
    },
    servers: [
      {
        url: "https://cse341-project-princesses.onrender.com" // our url on render.com (web service)
      }
    ]
  },
  apis: ["./routes/*.js"] // Read JSDoc from all routes
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;