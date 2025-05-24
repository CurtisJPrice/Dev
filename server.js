const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb } = require("./db/connection");
const princessRoutes = require("./routes");
//const swaggerUi = require("swagger-ui-express"); // eslint-disable-line no-unused-vars
// const swaggerDocument = require('./swagger.json'); // for swagger static
const swaggerRoutes = require("./routes/swagger"); // for swagger dynamic

const jsonErrorHandler = require("./middleware/jsonErrorHandler");

const app = express();


/* Swagger route */
app.use("/", swaggerRoutes); //swagger dynamic
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // swagger static

/* middleware */
app.use(bodyParser.json());

/*  catch body parser error */
app.use(jsonErrorHandler);

/* CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //header CORS (Cross-Origin Resource Sharing) : Allow all domains to access this API.
  next();
});

/* Main route */
app.use("/", princessRoutes);

/* Global Error Handlers - place before server*/
process.on("uncaughtException", (err, origin) => {
  console.error("❗ Uncaught Exception:", err.message);
  console.error("Origin:", origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❗ Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
});

/* Start server */
connectToDb().then(() => {
  const PORT = process.env.PORT || 8083;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}.`);
  });
});
