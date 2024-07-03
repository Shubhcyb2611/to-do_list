// import { DataSource } from "typeorm";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// const { DATABASE_URL } = process.env;

// const entities = [path.resolve(__dirname, "../domain/entities/*.{ts,js}")];
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   url: DATABASE_URL,
//   entities,
//   synchronize: false,
//   migrations: [path.resolve(__dirname, "./migrations/*.{ts,js}")],
// });

import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Get the current filename and dirname using Node.js built-in methods
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Retrieve database URL from environment variables
const { DATABASE_URL } = process.env;

// Define paths to entities and migrations
const entitiesPath = path.resolve(__dirname, "../domain/entities/*.{ts,js}");
const migrationsPath = path.resolve(__dirname, "./migrations/*.{ts,js}");

// Create a new DataSource instance for TypeORM
export const AppDataSource = new DataSource({
  type: "postgres", // Adjust the type if you are using a different database
  url: DATABASE_URL,
  entities: [entitiesPath],
  synchronize: false, // Set to true for development, false for production
  migrations: [migrationsPath],
});

