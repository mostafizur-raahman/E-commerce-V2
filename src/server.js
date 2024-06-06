const App = require("./app.js");
const config = require("./app/config/index.js");

(async () => {
    const appInstance = new App();
    await appInstance.connectDatabase();
    appInstance.listen(config.port);
})();
