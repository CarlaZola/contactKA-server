import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const settings = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      synchronize: true,
      database: ":memory:",
      entities: [entitiesPath],
    };
  }

  const dbURL: string | undefined = process.env.DATABASE_URL;

  if (!dbURL) throw new Error("Missing env var: 'DATABASE_URL'");

  return {
    type: "postgres",
    url: dbURL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource = new DataSource(settings());

export default AppDataSource;
