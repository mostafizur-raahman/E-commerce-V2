import App from "./app.js";
import config from "./app/config/index.js";

(async () => {
    const appInstance = new App();
    await appInstance.connectDatabase();
    appInstance.listen(config.port);
})();
