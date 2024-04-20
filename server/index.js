import express from "express";
import sequelize from "./db.js";
import models from "./models/models.js";
import cors from "cors";
import router from "./routes/index.js";
import fileUpload from "express-fileupload";
import ErrorHandler from "./middleware/ErrorHandlerMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 7000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors());
app.use("/api", router);

// MiddleWare на ошибки
app.use(ErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
