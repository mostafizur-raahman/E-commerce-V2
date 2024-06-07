const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./app/config/index.js");
const globalError = require("./app/middleware/GlobalError.js");
const notFound = require("./app/middleware/NotFound.js");
const router = require("./app/routes/index.js");

class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    initializeRoutes() {
        // Application routes
        this.app.use("/api/v1", router);
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
    }

    initializeErrorHandling() {
        // Not found routes
        this.app.use((req, res, next) => {
            notFound.handleNotFound(req, res, next);
        });
        // Global error handlers
        this.app.use((error, req, res, next) => {
            globalError.handleError(error, req, res, next);
        });
    }

    async connectDatabase() {
        try {
            await mongoose.connect(config.mongoURI, {
                useNewUrlParser: true,
            });
            console.log("MongoDB connected");
        } catch (error) {
            console.error("Database connection error:", error);
            process.exit(1);
        }
    }

    listen() {
        this.app.listen(config.port, () => {
            console.log(
                `${config.appName} is listening on port ${config.port}`
            );
        });
    }
}

module.exports = App;
