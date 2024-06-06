import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./app/config/index.js";
import globalError from "./app/middleware/GlobalError.js";
import notFound from "./app/middleware/NotFound.js";
import router from "./app/routes/index.js";

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
                useUnifiedTopology: true,
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
                `${config.app_name} is listening on port ${config.port}`
            );
        });
    }
}

export default App;
