require("dotenv").config();
import express from "express";
import configviewEngine from "./config/viewEngine.js";
import configCors from "./config/cors.js";
import initWebRoutes from "./routes/web.js";
import initApiRoutes from "./routes/api.js";

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//Config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config CORS
configCors(app);

//Config template engine
configviewEngine(app);

initWebRoutes(app);

initApiRoutes(app);

app.listen(port, hostname, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
});
