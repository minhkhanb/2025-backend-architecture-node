import "reflect-metadata";
import {DataSource, DataSourceOptions} from "typeorm";
import express from "express";
import { User } from "./entity/User";
import userRoutes from "./routes/userRoutes";

const options: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: "tracking-db",
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entity/*"],
  migrations: [],
  subscribers: [],
};

const app = express();
app.use(express.json());

export const AppDataSource = new DataSource(options);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.listen(9000, () => {
      console.log("Server is running on http://localhost:9000");
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

// Sau khi khởi tạo DataSource
app.use("/users", userRoutes);

