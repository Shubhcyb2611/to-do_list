import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Get the current filename and dirname using Node.js built-in methods
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Debugging: Log the loaded environment variables
console.log(
  `Environment variables loaded: ${JSON.stringify(process.env, null, 2)}`
);

// Retrieve database URL from environment variables
const { DATABASE_URL } = process.env;

// Check if DATABASE_URL is defined
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

// Define paths to entities and migrations
const entitiesPath = path.resolve(__dirname, "../domain/entities/*.{ts,js}");
const migrationsPath = path.resolve(__dirname, "./migrations/*.{ts,js}");

// Create a new DataSource instance for TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  url: DATABASE_URL,
  entities: [entitiesPath],
  synchronize: false,
  migrations: [migrationsPath],
});
